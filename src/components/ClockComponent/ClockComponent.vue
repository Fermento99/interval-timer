<script setup lang="ts">
import { useClockStore } from '@/stores/ClockStore';
import { computed } from 'vue';
import ClockFace from '@/components/ClockComponent/ClockFace.vue';
import type { ClockMode } from '@/stores/ExerciseStore';

const props = withDefaults(
  defineProps<{
    clockId: string;
    mode: ClockMode;
    isBackward?: boolean;
  }>(),
  {
    isBackward: false,
  }
);
const clockState = useClockStore();
const currentClock = clockState.getClock(props.clockId);

const elapsedTime = computed(
  () =>
    (props.isBackward ? currentClock.period - currentClock.progress : currentClock.progress) / 1000
);
const percentage = computed(() => currentClock.progress / currentClock.period);
</script>

<template>
  <ClockFace
    :clock-id="clockId"
    :percentage="percentage"
    :elapsed-time="elapsedTime"
    :mode="mode"
    :isBackward="isBackward"
  />
</template>
