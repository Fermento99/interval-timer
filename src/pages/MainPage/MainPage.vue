<script setup lang="ts">
import ClockComponent from '@/components/ClockComponent/ClockComponent.vue';
import ExerciseTableComponent from '@/components/ExerciseTableComponent/ExerciseTableComponent.vue';
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue';
import NotesComponent from '@/components/NotesComponent/NotesComponent.vue';
</script>

<template>
  <div class="p-14">
    <div class="flex flex-row gap-14 justify-center">
      <div class="flex flex-row items-end">
        <ClockComponent clock-id="exercise-clock" />
        <ClockComponent clock-id="training-clock" size="small" />
      </div>
      <div class="flex flex-col gap-8 items-center justify-center">
        <ExerciseTableComponent />
        <ButtonComponent label="Training Setup" color="secondary" size="small" is-pill />
        <NotesComponent />
      </div>
    </div>
    <div class="mt-16 flex flex-row gap-8 justify-center">
      <ButtonComponent label="Start" color="secondary" />
      <ButtonComponent label="Pause" />
      <ButtonComponent label="Restart" color="special" />
    </div>
  </div>
</template>