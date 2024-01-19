<script setup lang="ts">
import { useClockStore } from '@/stores/ClockStore';
import { computed } from 'vue';
import ClockFace from '@/components/ClockComponent/ClockFace.vue';

const props = withDefaults(
  defineProps<{
    clockId: string;
    size?: 'big' | 'small';
  }>(),
  {
    size: 'big',
  }
);

const clockState = useClockStore();

const start = () => {
  clockState.startClock();
};

const stop = () => {
  clockState.pauseClock();
};

const reset = () => {
  clockState.setClock({ period: 20 });
};

const elapsedTime = computed(() => clockState.progress / 1000);
const percentage = computed(() => clockState.progress / clockState.period);

const sizeValue = computed(() => {
  switch (props.size) {
    case 'big':
      return 500;
    case 'small':
      return 250;
    default:
      return 500;
  }
});
</script>

<template>
  <ClockFace
    :clock-id="clockId"
    :percentage="percentage"
    :elapsed-time="elapsedTime"
    :height="sizeValue"
    :width="sizeValue"
  />
</template>
