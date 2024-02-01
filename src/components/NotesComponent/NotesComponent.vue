<script setup lang="ts">
import NotesRow from '@/components/NotesComponent/NotesRow.vue';
import { useExerciseStore } from '@/stores/ExerciseStore';

const exerciseStore = useExerciseStore();
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-2">
      <NotesRow label="Current Exercise" :value="exerciseStore.currentExercise.name" />
      <NotesRow label="Exercise Notes" :value="exerciseStore.currentExercise.notes" />
    </div>
    <NotesRow label="Upcoming Exercise" :value="exerciseStore.nextExercise.name" size="normal" />
  </div>
</template>
