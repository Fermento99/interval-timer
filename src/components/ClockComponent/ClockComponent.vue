<script setup lang="ts">
import { useClockStore } from '@/stores/ClockStore';
import { computed } from 'vue';
import ClockFace from '@/components/ClockComponent/ClockFace.vue';

defineProps({
  clockId: { type: String, required: true },
});

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
</script>

<template>
  <ClockFace
    :clock-id="clockId"
    :percentage="percentage"
    :elapsed-time="elapsedTime"
    :height="400"
    :width="400"
  />
  <h1>{{ clockId }}</h1>
  <p>{{ elapsedTime }} s of progress</p>
  <p>{{ percentage }}</p>
  <p>set to period of {{ clockState.period }} ms</p>
  <p>started at {{ clockState._startedTimestamp }}</p>
  <p>{{ clockState._interval }} interval id</p>
  <button @click="start">start</button>
  <button @click="stop">stop</button>
  <button @click="reset">reset</button>
</template>

<style scoped></style>
