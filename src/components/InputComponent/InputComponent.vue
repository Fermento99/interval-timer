<script setup lang="ts">
import TypographyComponent from '@/components/TypographyComponent/TypographyComponent.vue';

type InputWidthType = 'narrow' | 'wide';

const props = withDefaults(
  defineProps<{
    label?: string;
    value?: string;
    maxValue?: number;
    minValue?: number;
    type?: string;
    inputWidth?: InputWidthType;
  }>(),
  {
    label: 'Label',
    value: 'value',
    type: 'text',
    inputWidth: 'narrow',
  }
);
const emits = defineEmits<{
  change: [event: Event];
}>();

const getWidthStyle = (width: InputWidthType) => {
  switch (width) {
    case 'narrow':
      return 'w-24';
    case 'wide':
      return 'w-[50%]';
  }
};
</script>

<template>
  <div class="flex flex-row justify-between items-center">
    <TypographyComponent>{{ props.label }}</TypographyComponent>
    <input
      :class="`${getWidthStyle(
        props.inputWidth
      )} px-2 py-1 border border-input-border rounded text-xs`"
      :value="value"
      :type="type"
      :min="minValue"
      :max="maxValue"
      @input="(event) => emits('change', event)"
    />
  </div>
</template>
