<script setup lang="ts">
import { useExerciseStore } from '@/stores/ExerciseStore';
import ExerciseTile from '@/components/ExerciseTableComponent/ExerciseTile.vue';

const exerciseStore = useExerciseStore();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex flex-row gap-2"
      v-for="cycleIndex in exerciseStore.exerciseTable.cycleCount"
      :key="cycleIndex"
    >
      <ExerciseTile
        v-for="exerciseIndex in exerciseStore.exerciseTable.cycleLength"
        :key="exerciseIndex"
        :exercise-index="
          exerciseStore.exerciseTable.cycleLength * (cycleIndex - 1) + exerciseIndex - 1
        "
        :exerciseNumber="exerciseIndex"
      />
    </div>
  </div>
</template>
