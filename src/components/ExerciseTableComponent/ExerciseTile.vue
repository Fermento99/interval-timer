<script setup lang="ts">
import { useExerciseStore } from '@/stores/ExerciseStore';
import { computed } from 'vue';

const props = defineProps<{
  exerciseIndex: number;
  exerciseNumber: number;
}>();

const emits = defineEmits<{
  click: [exerciseIndex: number];
}>();

const exerciseStore = useExerciseStore();

const initials = computed(() => {
  const name = exerciseStore.getExercise(props.exerciseIndex).name;
  return name.trim() !== 'New Exercise'
    ? name
        .split(' ')
        .map((part) => part.toUpperCase()[0])
        .join('')
    : '';
});
const done = computed(() => exerciseStore.getExercise(props.exerciseIndex).done);
</script>

<template>
  <div
    :class="`w-10 md:w-14 h-10 px-2 py-1 text-white text-xs flex justify-center md:justify-between ${
      done ? 'bg-exercise-red' : 'bg-exercise-green'
    }`"
    @click="() => emits('click', exerciseIndex)"
  >
    <span class="max-md:hidden">{{ initials }}</span>
    <span class="self-center md:self-end ml-auto max-md:mr-auto max-md:text-lg">{{
      exerciseNumber
    }}</span>
  </div>
</template>
