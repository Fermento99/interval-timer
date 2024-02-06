<script setup lang="ts">
import { ref, watch } from 'vue';
import { useExerciseStore } from '@/stores/ExerciseStore';
import DialogComponent from '@/components/DialogComponent/DialogComponent.vue';
import TypographyComponent from '@/components/TypographyComponent/TypographyComponent.vue';
import InputComponent from '@/components/InputComponent/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue';

type FormData = { name: string; notes: string };

const props = defineProps<{
  open: boolean;
  exerciseIndex: number;
}>();

const emits = defineEmits<{
  close: [];
}>();

const exerciseStore = useExerciseStore();
const formData = ref({ name: '', notes: '' });

const handleChange = (key: keyof FormData, event: Event) => {
  formData.value[key] = (event.target as HTMLInputElement).value;
};
const save = () => {
  exerciseStore.setExerciseDetails(props.exerciseIndex, formData.value);
  emits('close');
};
const saveForAll = () => {
  exerciseStore.setExerciseDetails(props.exerciseIndex, formData.value, true);
  emits('close');
};

watch(
  () => props.open,
  () => {
    const { name, notes } = exerciseStore.exercises[props.exerciseIndex];
    formData.value.name = name;
    formData.value.notes = notes;
  }
);
</script>

<template>
  <DialogComponent :open="open">
    <template #header>
      <TypographyComponent> Exercise Details {{ exerciseIndex }}</TypographyComponent>
    </template>
    <template #content>
      <InputComponent
        label="Exercise Name"
        type="text"
        :value="formData.name"
        @change="(event) => handleChange('name', event)"
      />
      <InputComponent
        label="Exercise Notes"
        type="text"
        :value="formData.notes"
        @change="(event) => handleChange('notes', event)"
      />
    </template>
    <template #actions>
      <ButtonComponent
        label="Cancel"
        size="small"
        color="secondary"
        @click="() => emits('close')"
      />
      <ButtonComponent label="Save for All" size="small" color="special" @click="saveForAll" />
      <ButtonComponent label="Save" size="small" @click="save" />
    </template>
  </DialogComponent>
</template>
