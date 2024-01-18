<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { ClockDrawer } from '@/components/ClockComponent/ClockDrawer';

const props = defineProps<{
  clockId: string;
  percentage: number;
  elapsedTime: number;
  height: number;
  width: number;
}>();

const drawer = ref();

onMounted(() => {
  const canvas = document.getElementById(props.clockId) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  // TODO: investigate if colors could be imported from tailwind
  drawer.value = new ClockDrawer({
    ctx,
    height: props.height,
    width: props.width,
    colors: {
      chase: '#629460',
      escape: '#ED254E',
      center: '#F4FFFD',
      text: '#000',
    },
  });

  drawer.value.drawClock({
    time: props.elapsedTime!,
    percentage: props.percentage!,
  });
});

watchEffect(() => {
  drawer.value?.drawClock({
    time: props.elapsedTime!,
    percentage: props.percentage!,
  });
});
</script>

<template>
  <canvas :id="clockId" :width="width" :height="height" />
</template>
