<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { ClockDrawer } from '@/components/ClockComponent/ClockDrawer';
import type { ClockMode } from '@/stores/ExerciseStore';

const props = defineProps<{
  clockId: string;
  percentage: number;
  elapsedTime: number;
  mode: ClockMode;
  isBackward: boolean;
}>();

const drawer = ref();

const getColors = (mode: ClockMode) => {
  // TODO: investigate if colors could be imported from tailwind
  switch (mode) {
    case 'exercise':
      return { chase: '#629460', escape: '#ED254E', center: '#F4FFFD', text: '#000' };
    case 'rest':
      return { chase: '#ED254E', escape: '#629460', center: '#F4FFFD', text: '#000' };
    case 'pause':
      return { chase: '#ffd23f', escape: '#666666', center: '#F4FFFD', text: '#000' };
  }
};

onMounted(() => {
  const canvas = document.getElementById(props.clockId) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  drawer.value = new ClockDrawer({
    ctx,
    height: 500,
    width: 500,
    colors: getColors(props.mode),
  });

  drawer.value.drawClock({
    time: props.elapsedTime,
    percentage: props.percentage,
  });
});

watch(
  () => props.elapsedTime,
  () => {
    drawer.value?.drawClock({
      time: props.elapsedTime,
      percentage: props.percentage,
    });
  }
);

watch(
  () => props.mode,
  () => drawer.value.setColors(getColors(props.mode))
);
</script>

<template>
  <canvas :id="clockId" width="500" height="500" />
</template>
