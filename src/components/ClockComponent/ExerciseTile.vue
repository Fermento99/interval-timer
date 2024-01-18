<script setup lang="ts">
const props = defineProps<{
  cycleIndex: number;
  exerciseIndex: number;
  done: boolean;
}>();
</script>

<template>
  <div
    :class="`w-14 h-10 px-2 py-1 text-white text-xs flex justify-end items-end ${
      done ? 'bg-exercise-red' : 'bg-exercise-green'
    }`"
  >
    {{ props.exerciseIndex + 1 }}
  </div>
</template>
