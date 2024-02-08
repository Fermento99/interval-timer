<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useClockStore } from '@/stores/ClockStore';
import { useExerciseStore } from '@/stores/ExerciseStore';
import ClockComponent from '@/components/ClockComponent/ClockComponent.vue';
import ExerciseTableComponent from '@/components/ExerciseTableComponent/ExerciseTableComponent.vue';
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue';
import NotesComponent from '@/components/NotesComponent/NotesComponent.vue';
import SetupDialog from '@/pages/MainPage/SetupDialog.vue';

const isSetupOpen = ref(false);

const clockState = useClockStore();
const exerciseState = useExerciseStore();

clockState.setClock('exercise-clock', { period: exerciseState.currentClock.time });
clockState.setClock('training-clock', { period: exerciseState.periodSum });

const start = () => {
  clockState.startClocks();
};

const stop = () => {
  clockState.stopClocks();
};

const reset = () => {
  exerciseState.resetTable();
  clockState.setClock('exercise-clock', { period: exerciseState.currentClock.time });
  clockState.setClock('training-clock', { period: exerciseState.periodSum });
};

watchEffect(() => {
  const clock = clockState.getClock('exercise-clock');
  if (clock.finished) {
    exerciseState.moveToNextClock();
    if (exerciseState.currentClock) {
      const finishTimestamp = clock.startedAt + clock.period;
      clockState.setClock('exercise-clock', {
        period: exerciseState.currentClock.time,
        startedAt: finishTimestamp,
      });
    }
  }
});
</script>

<template>
  <div class="p-14">
    <div class="flex flex-row gap-14 justify-center">
      <div class="flex flex-row items-end">
        <ClockComponent clock-id="exercise-clock" :mode="exerciseState.currentClock.mode" />
        <ClockComponent clock-id="training-clock" mode="pause" size="small" is-backward />
      </div>
      <div class="flex flex-col gap-8 items-center justify-center">
        <ExerciseTableComponent />
        <ButtonComponent
          label="Training Setup"
          color="secondary"
          size="small"
          is-pill
          @click="() => (isSetupOpen = true)"
        />
        <NotesComponent />
      </div>
    </div>
    <div class="mt-16 flex flex-row gap-8 justify-center">
      <ButtonComponent label="Start" color="secondary" @click="start" />
      <ButtonComponent label="Pause" @click="stop" />
      <ButtonComponent label="Restart" color="special" @click="reset" />
    </div>
  </div>
  <SetupDialog
    :open="isSetupOpen"
    @close="
      () => {
        isSetupOpen = false;
        reset();
      }
    "
  />
</template>
