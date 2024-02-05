<script setup lang="ts">
import TypographyComponent from '@/components/TypographyComponent/TypographyComponent.vue';

const props = withDefaults(
  defineProps<{
    label?: string;
    value?: string;
    maxValue?: number;
    minValue?: number;
    type?: string;
    inputWidth?: number;
  }>(),
  {
    label: 'Label',
    value: 'value',
    type: 'text',
    inputWidth: 10,
  }
);
const emits = defineEmits<{
  change: [event: Event];
}>();
</script>

<template>
  <div class="flex flex-row justify-between items-center">
    <TypographyComponent>{{ props.label }}</TypographyComponent>
    <input
      class="w-24 px-2 py-1 border border-input-border rounded text-xs"
      :value="value"
      :type="type"
      :min="minValue"
      :max="maxValue"
      @input="(event) => emits('change', event)"
    />
  </div>
</template>
