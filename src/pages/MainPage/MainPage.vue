<script setup lang="ts">
import ClockComponent from '@/components/ClockComponent/ClockComponent.vue';
import ExerciseTableComponent from '@/components/ExerciseTableComponent/ExerciseTableComponent.vue';
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue';
import NotesComponent from '@/components/NotesComponent/NotesComponent.vue';
import { useClockStore } from '@/stores/ClockStore';

const clockState = useClockStore();

const start = () => {
  clockState.startClocks();
};

const stop = () => {
  clockState.stopClocks();
};

const reset = () => {
  clockState.setClock('exercise-clock', { period: 0.5 });
  clockState.setClock('training-clock', { period: 5, startedAt: Date.now() });
};
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
      <ButtonComponent label="Start" color="secondary" @click="start" />
      <ButtonComponent label="Pause" @click="stop" />
      <ButtonComponent label="Restart" color="special" @click="reset" />
    </div>
  </div>
</template>
