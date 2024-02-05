<script setup lang="ts">
import { ref } from 'vue';
import { useExerciseStore } from '@/stores/ExerciseStore';
import ExerciseTile from '@/components/ExerciseTableComponent/ExerciseTile.vue';
import DetailsDialog from '@/components/ExerciseTableComponent/DetailsDialog.vue';

const exerciseStore = useExerciseStore();
const detailsData = ref({ exerciseIndex: 0, isOpen: false });
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
        @click="(exerciseId) => (detailsData = { isOpen: true, exerciseIndex: exerciseId })"
      />
    </div>
  </div>
  <DetailsDialog
    :exercise-index="detailsData.exerciseIndex"
    :open="detailsData.isOpen"
    @close="() => (detailsData.isOpen = false)"
  />
</template>
