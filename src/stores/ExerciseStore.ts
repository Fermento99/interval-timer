import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface ExerciseTable {
  cycles: Cycle[];
  cycleCunt: number;
  cycleLength: number;
  exerciseTime: number;
  restTime: number;
  pauseTime: number;
  iterator: number;
  length: number;
}

interface Cycle {
  exercises: Exercise[];
}

interface Exercise {
  name: string;
  notes: string;
  done: boolean;
}

const DEFAULT_TABLE_SETUP = {
  cycles: Array(3)
    .fill(null)
    .map(() => ({
      exercises: Array(7)
        .fill(null)
        .map(() => ({
          name: 'new exercise',
          notes: '',
          done: false,
        })),
    })),
  cycleCunt: 3,
  cycleLength: 7,
  exerciseTime: 50,
  restTime: 30,
  pauseTime: 210,
  iterator: 0,
  length: 21,
};
export const useExerciseStore = defineStore('exercise', () => {
  const exerciseTable = ref<ExerciseTable>(DEFAULT_TABLE_SETUP);
  const currentExercise = computed(() => {
    const { cycles, cycleLength, iterator } = exerciseTable.value;
    console.log('current', Math.floor(iterator / cycleLength), iterator % cycleLength);
    return cycles[Math.floor(iterator / cycleLength)].exercises[iterator % cycleLength];
  });
  const nextExercise = computed(() => {
    const { cycles, cycleLength, iterator } = exerciseTable.value;
    if ((iterator + 1) % cycleLength === 0) {
      console.log('next', Math.floor(iterator / cycleLength) + 1, 0);
      return cycles[Math.floor(iterator / cycleLength) + 1]?.exercises[0] || { name: '--' };
    }
    console.log('next', Math.floor(iterator / cycleLength), (iterator % cycleLength) + 1);
    return cycles[Math.floor(iterator / cycleLength)].exercises[(iterator % cycleLength) + 1];
  });

  const setExerciseTableConfig = (tableConfig: Omit<ExerciseTable, 'cycles' | 'iterator'>) => {
    Object.assign(exerciseTable.value, tableConfig, {
      iterator: 0,
      length: tableConfig.cycleLength * tableConfig.cycleCunt,
    });
    exerciseTable.value.cycles = Array(tableConfig.cycleLength)
      .fill(null)
      .map(() => ({
        exercises: Array(tableConfig.cycleCunt)
          .fill(null)
          .map(() => ({
            name: 'new exercise',
            notes: '',
            done: false,
          })),
      }));
  };

  const setExerciseDetails = (index: number, exerciseConfig: Partial<Exercise>) => {
    const { cycles, cycleLength } = exerciseTable.value;
    Object.assign(
      cycles[Math.floor(index / cycleLength)].exercises[index % cycleLength],
      exerciseConfig
    );
  };

  const moveToNextExercise = () => {
    setExerciseDetails(exerciseTable.value.iterator, { done: true });
    exerciseTable.value.iterator++;
  };

  return {
    exerciseTable,
    currentExercise,
    nextExercise,
    setExerciseTableConfig,
    setExerciseDetails,
    moveToNextExercise,
  };
});
