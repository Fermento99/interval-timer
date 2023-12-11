<script setup lang="ts">
type colorType = 'primary' | 'secondary' | 'special';
type sizeType = 'medium' | 'small';

const props = withDefaults(
  defineProps<{
    label: string;
    color: colorType;
    size: sizeType;
    isPill: boolean;
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

const className =
  'button-button ' +
  `button-button_size_${props.size} ` +
  `button-button_color_${props.color} ` +
  `${props.isPill ? ' button-button_isPill' : ''}`;
</script>

<template>
  <button :class="className" @click="(event) => emits('click', event)">
    {{ label }}
  </button>
</template>

<style scoped>
.button-button {
  border-radius: 4px;
  border: 1px solid #000000;
}

.button-button:hover {
  box-shadow: -2px 2px 0 #000000;
  cursor: pointer;
}

.button-button:active {
  box-shadow: 1px -1px 0 #000000;
}

.button-button_size_medium {
  font-size: 16px;
  padding: 8px 16px;
}

.button-button_size_small {
  font-size: 12px;
  padding: 4px 8px;
}

.button-button_color_primary {
  background-color: #000000;
  color: #ffffff;
}

.button-button_color_secondary {
  background-color: #ffffff;
  color: #000000;
}

.button-button_color_special {
  background-color: #ffd23f;
  color: #000000;
}

.button-button_size_medium.button-button_isPill {
  border-radius: 17px;
}

.button-button_size_small.button-button_isPill {
  border-radius: 11px;
}
</style>
