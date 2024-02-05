import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface ExerciseTable {
  periods: Period[];
  cycleCount: number;
  cycleLength: number;
  exerciseTime: number;
  restTime: number;
  pauseTime: number;
  iterator: number;
}

interface Period {
  name: string;
  notes: string;
  done: boolean;
  time: number;
  mode: ClockMode;
}

type ClockMode = 'exercise' | 'rest' | 'pause';
export type TableConfig = Omit<ExerciseTable, 'periods' | 'iterator'>;

const DEFAULT_TABLE_CONFIG = <TableConfig>{
  cycleCount: 3,
  cycleLength: 7,
  exerciseTime: 0.5,
  restTime: 0.2,
  pauseTime: 5,
};

const generateTable = (config: TableConfig): ExerciseTable => {
  const { cycleCount, cycleLength, exerciseTime, restTime, pauseTime } = config;
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
          name: 'New Exercise',
          notes: '--',
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
    ...config,
    periods,
    iterator: 0,
  };
};

export const useExerciseStore = defineStore('exercise', () => {
  const exerciseTable = ref<ExerciseTable>(generateTable(DEFAULT_TABLE_CONFIG));

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
    exerciseTable.value = generateTable(tableConfig);
  };

  const setExerciseDetails = (index: number, exerciseConfig: Partial<Period>) => {
    Object.assign(exerciseTable.value.periods[index], exerciseConfig);
  };

  const moveToNextClock = () => {
    setExerciseDetails(exerciseTable.value.iterator, { done: true });
    exerciseTable.value.iterator++;
  };

  const resetTable = () => {
    exerciseTable.value.periods.forEach((period) => (period.done = false));
    exerciseTable.value.iterator = 0;
  };

  const getExercise = (index: number) => exercises.value[index];

  return {
    exerciseTable,
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
