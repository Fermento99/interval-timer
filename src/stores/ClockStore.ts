import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type SetClockOptions = { period: number };

export const useClockStore = defineStore('clock', () => {
  const progress = ref(0);
  const period = ref(0);
  const _startedTimestamp = ref(0);
  const _interval = ref<number | undefined>();

  const percentage = computed(() => progress.value / period.value);

  const stopClock = () => {
    clearInterval(_interval.value);
    _interval.value = undefined;
  };

  const setClock = (options: SetClockOptions) => {
    period.value = options.period * 1000;
    progress.value = 0;
    if (_interval.value !== undefined) {
      stopClock();
    }
  };

  const startClock = () => {
    if (_interval.value === undefined && period.value > progress.value) {
      _startedTimestamp.value = Date.now() - progress.value;
      _interval.value = setInterval(() => {
        progress.value = Date.now() - _startedTimestamp.value;
        if (progress.value >= period.value) {
          stopClock();
        }
      }, 30);
    }
  };

  const pauseClock = () => {
    stopClock();
  };

  return {
    progress,
    period,
    _startedTimestamp,
    _interval,
    percentage,
    setClock,
    startClock,
    pauseClock,
  };
});
