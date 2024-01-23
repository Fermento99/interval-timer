import { defineStore } from 'pinia';
import { ref } from 'vue';

type SetClockOptions = { period: number; startedAt?: number };

type Clock = {
  period: number;
  progress: number;
  startedAt: number;
  running: boolean;
  finished: boolean;
};

type ClockMap = {
  [id: string]: Clock;
};

export const useClockStore = defineStore('clock', () => {
  const clockMap = ref<ClockMap>({});

  const stopClock = (id: string) => {
    if (clockMap.value[id] !== undefined) {
      clockMap.value[id].running = false;
    }
  };

  const stopClocks = () => {
    Object.keys(clockMap.value).forEach((clockId) => {
      stopClock(clockId);
    });
  };

  const setClock = (id: string, options: SetClockOptions) => {
    const source = <Clock>{
      period: options.period * 1000,
      progress: 0,
      startedAt: options.startedAt || 0,
      running: !!options.startedAt,
      finished: false,
    };

    if (clockMap.value[id] === undefined) {
      clockMap.value[id] = source;
    } else {
      Object.assign(clockMap.value[id], source);
    }
  };

  const startClock = (id: string, now = Date.now()) => {
    if (clockMap.value[id] !== undefined) {
      const currentClock = clockMap.value[id];
      if (!currentClock.finished) {
        currentClock.startedAt = now - currentClock.progress;
        currentClock.running = true;
      }
    }
  };

  const startClocks = () => {
    const now = Date.now();
    Object.keys(clockMap.value).forEach((clockId) => {
      startClock(clockId, now);
    });
  };

  const getClock = (id: string) => {
    if (clockMap.value[id] === undefined) {
      clockMap.value[id] = {
        period: 0,
        progress: 0,
        startedAt: 0,
        running: false,
        finished: false,
      };
    }

    return clockMap.value[id];
  };

  const progressClocks = () => {
    const now = Date.now();
    Object.values(clockMap.value).forEach((clock) => {
      if (clock.running) {
        clock.progress = now - clock.startedAt;
        if (clock.progress >= clock.period) {
          clock.finished = true;
          clock.running = false;
          clock.progress = clock.period;
        }
      }
    });
  };

  setInterval(progressClocks, 30);

  return {
    clockMap,
    setClock,
    startClock,
    startClocks,
    stopClock,
    stopClocks,
    getClock,
  };
});
