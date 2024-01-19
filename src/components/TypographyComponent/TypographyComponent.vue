<script setup lang="ts">
type sizeType = 'normal' | 'large';
type colorType = 'primary' | 'secondary';

const props = withDefaults(
  defineProps<{
    size?: sizeType;
    color?: colorType;
  }>(),
  {
    size: 'normal',
    color: 'primary',
  }
);

const getSizeStyles = (size: sizeType) => {
  switch (size) {
    case 'normal':
      return 'text-xs';
    case 'large':
      return 'text-base';
  }
};

const getColorStyle = (color: colorType) => {
  switch (color) {
    case 'primary':
      return 'text-text-primary';
    case 'secondary':
      return 'text-text-secondary';
  }
};
</script>

<template>
  <p :class="`${getSizeStyles(props.size)} ${getColorStyle(props.color)}`">
    <slot name="default" />
  </p>
</template>
