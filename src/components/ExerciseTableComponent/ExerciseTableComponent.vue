<script setup lang="ts">
import { useExerciseStore } from '@/stores/ExerciseStore';
import ExerciseTile from '@/components/ClockComponent/ExerciseTile.vue';

const exerciseStore = useExerciseStore();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex flex-row gap-2"
      v-for="(cycle, cycleIndex) in exerciseStore.exerciseTable.cycles"
      :key="cycleIndex"
    >
      <ExerciseTile
        v-for="(exercise, exerciseIndex) in cycle.exercises"
        :key="exerciseIndex"
        :cycle-index="cycleIndex"
        :exercise-index="exerciseIndex"
        :done="exercise.done"
      />
    </div>
  </div>
</template>
