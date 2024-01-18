import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ExerciseTable {
  cycles: Cycle[];
  cycleCunt: number;
  cycleLength: number;
  exerciseTime: number;
  restTime: number;
  pauseTime: number;
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
};
export const useExerciseStore = defineStore('exercise', () => {
  const exerciseTable = ref<ExerciseTable>(DEFAULT_TABLE_SETUP);

  const setExerciseTableConfig = (tableConfig: Omit<ExerciseTable, 'cycles'>) => {
    Object.assign(exerciseTable.value, tableConfig);
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

  const setExerciseDetails = (
    cycleIndex: number,
    exerciseIndex: number,
    exerciseConfig: Partial<Exercise>
  ) => {
    Object.assign(exerciseTable.value.cycles[cycleIndex].exercises[exerciseIndex], exerciseConfig);
  };

  return { exerciseTable, setExerciseTableConfig, setExerciseDetails };
});
