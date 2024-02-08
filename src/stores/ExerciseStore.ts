import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {
  type ExerciseDetails,
  getDefaultConfig,
  type SavedConfig,
  saveDefaultConfig,
} from '@/stores/LocalStorageUtils';

interface ExerciseTable {
  periods: Period[];
  cycleCount: number;
  cycleLength: number;
  exerciseTime: number;
  restTime: number;
  pauseTime: number;
  iterator: number;
}

export interface Period {
  name: string;
  notes: string;
  done: boolean;
  time: number;
  mode: ClockMode;
}

export type ClockMode = 'exercise' | 'rest' | 'pause';
export type TableConfig = Omit<ExerciseTable, 'periods' | 'iterator'>;

const DEFAULT_TABLE_CONFIG = <TableConfig>{
  cycleCount: 3,
  cycleLength: 7,
  exerciseTime: 30,
  restTime: 20,
  pauseTime: 120,
};

const generateTable = (): ExerciseTable => {
  let defaultConfig: SavedConfig;

  try {
    defaultConfig = getDefaultConfig();
  } catch (error) {
    defaultConfig = { ...DEFAULT_TABLE_CONFIG, exercises: [] };
  }

  const { cycleCount, cycleLength, exerciseTime, restTime, pauseTime, exercises } = defaultConfig;
  const length = cycleCount * cycleLength;
  const periods = [
    {
      name: 'Head Start',
      notes: '--',
      done: false,
      time: 10,
      mode: 'pause',
    },
    ...Array(length)
      .fill(null)
      .flatMap((_, index): Period[] => [
        {
          name: exercises?.[index % cycleLength]?.name || 'New Exercise',
          notes: exercises?.[index % cycleLength]?.notes || '--',
          done: false,
          time: exerciseTime,
          mode: 'exercise',
        },
        index % cycleLength === cycleLength - 1
          ? {
              name: 'pause',
              notes: '--',
              done: false,
              time: pauseTime,
              mode: 'pause',
            }
          : {
              name: 'rest',
              notes: '--',
              done: false,
              time: restTime,
              mode: 'rest',
            },
      ]),
  ];
  periods.pop();

  return <ExerciseTable>{
    cycleCount,
    cycleLength,
    exerciseTime,
    restTime,
    pauseTime,
    periods,
    iterator: 0,
  };
};

export const useExerciseStore = defineStore('exercise', () => {
  const exerciseTable = ref<ExerciseTable>(generateTable());

  const periodSum = computed(() => {
    const pauses = exerciseTable.value.pauseTime * (exerciseTable.value.cycleCount - 1) + 10;
    const exercises =
      exerciseTable.value.cycleCount *
      exerciseTable.value.cycleLength *
      exerciseTable.value.exerciseTime;
    const rests =
      exerciseTable.value.cycleCount *
      (exerciseTable.value.cycleLength - 1) *
      exerciseTable.value.restTime;
    return pauses + rests + exercises;
  });

  const undoneExercises = computed(() =>
    exerciseTable.value.periods.filter((period) => period.mode === 'exercise' && !period.done)
  );

  const exercises = computed(() =>
    exerciseTable.value.periods.filter((period) => period.mode === 'exercise')
  );

  const currentExercise = computed(
    () =>
      undoneExercises.value[0] || {
        name: '--',
        notes: '--',
        done: false,
        time: 0,
        mode: 'exercise',
      }
  );

  const nextExercise = computed(
    () =>
      undoneExercises.value[1] || {
        name: '--',
        notes: '--',
        done: false,
        time: 0,
        mode: 'exercise',
      }
  );

  const currentClock = computed(() => exerciseTable.value.periods[exerciseTable.value.iterator]);

  const setExerciseTableConfig = (tableConfig: TableConfig) => {
    saveDefaultConfig(tableConfig);
    exerciseTable.value = generateTable();
  };

  const setExerciseDetails = (index: number, exerciseConfig: Partial<Period>, setAll = false) => {
    const exercisesList = exerciseTable.value.periods.filter(
      (period) => period.mode === 'exercise'
    );
    if (setAll) {
      // save exercise details to Local Storage
      const configExercises: ExerciseDetails[] = [];
      configExercises[index % exerciseTable.value.cycleLength] = {
        name: exerciseConfig.name,
        notes: exerciseConfig.notes,
      } as ExerciseDetails;
      saveDefaultConfig({ exercises: configExercises });

      // update exercise table
      const length = exerciseTable.value.cycleLength * exerciseTable.value.cycleCount;
      for (
        let i = index % exerciseTable.value.cycleLength;
        i < length;
        i += exerciseTable.value.cycleLength
      ) {
        Object.assign(exercisesList[i], exerciseConfig);
      }
    } else {
      Object.assign(exercisesList[index], exerciseConfig);
    }
  };

  const moveToNextClock = () => {
    exerciseTable.value.periods[exerciseTable.value.iterator].done = true;
    exerciseTable.value.iterator++;
  };

  const resetTable = () => {
    exerciseTable.value.periods.forEach((period) => (period.done = false));
    exerciseTable.value.iterator = 0;
  };

  const getExercise = (index: number) => exercises.value[index];

  return {
    exerciseTable,
    exercises,
    currentExercise,
    nextExercise,
    periodSum,
    currentClock,
    getExercise,
    setExerciseTableConfig,
    setExerciseDetails,
    moveToNextClock,
    resetTable,
  };
});
