<script setup lang="ts">
import Typography, {
  type sizeType,
} from '@/components/TypographyComponent/TypographyComponent.vue';

withDefaults(
  defineProps<{
    label: string;
    value: string;
    size: sizeType;
  }>(),
  {
    size: 'large',
  }
);
</script>

<template>
  <div class="flex flex-row justify-start gap-4">
    <Typography :size="size"> {{ label }}: </Typography>
    <Typography :size="size" color="secondary">
      {{ value }}
    </Typography>
  </div>
</template>
