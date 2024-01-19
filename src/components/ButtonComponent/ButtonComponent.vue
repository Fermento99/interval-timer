<script setup lang="ts">
type colorType = 'primary' | 'secondary' | 'special';
type sizeType = 'medium' | 'small';

const props = withDefaults(
  defineProps<{
    label?: string;
    color?: colorType;
    size?: sizeType;
    isPill?: boolean;
  }>(),
  {
    label: '',
    color: 'primary',
    size: 'medium',
    isPill: false,
  }
);

const emits = defineEmits<{
  click: [event: MouseEvent];
}>();

const getSizeStyles = (size: sizeType) => {
  switch (size) {
    case 'medium':
      return 'text-base px-4 py-1';
    case 'small':
      return 'text-xs px-2 py-0.5';
  }
};

const getColorStyles = (color: colorType) => {
  switch (color) {
    case 'primary':
      return 'bg-black text-white border-black';
    case 'secondary':
      return 'bg-white text-black border-black';
    case 'special':
      return 'bg-special text-black border-black';
  }
};

const getPillStyles = (pill: boolean) => {
  if (pill) return 'rounded-full';
  return 'rounded';
};
</script>

<template>
  <button
    :class="`border border-solid hover:opacity-40 active:scale-90 active:opacity-100 ${getSizeStyles(
      props.size
    )} ${getColorStyles(props.color)} ${getPillStyles(props.isPill)}`"
    @click="(event) => emits('click', event)"
  >
    {{ label }}
  </button>
</template>
