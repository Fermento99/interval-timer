<script setup lang="ts">
import { useExerciseStore } from '@/stores/ExerciseStore';

const props = defineProps<{
  exerciseIndex: number;
  exerciseNumber: number;
}>();

const exerciseStore = useExerciseStore();
</script>

<template>
  <div
    :class="`w-14 h-10 px-2 py-1 text-white text-xs flex justify-end items-end ${
      exerciseStore.getExercise(props.exerciseIndex).done ? 'bg-exercise-red' : 'bg-exercise-green'
    }`"
  >
    {{ exerciseNumber }}
  </div>
</template>
