<script setup lang="ts">
import DialogComponent from '@/components/DialogComponent/DialogComponent.vue';
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue';
import InputComponent from '@/components/InputComponent/InputComponent.vue';
import { type TableConfig, useExerciseStore } from '@/stores/ExerciseStore';
import { ref } from 'vue';
import TypographyComponent from '@/components/TypographyComponent/TypographyComponent.vue';

const props = defineProps<{
  open: boolean;
}>();

const emits = defineEmits<{
  close: [];
}>();

const exerciseTableStore = useExerciseStore();
const { restTime, exerciseTime, pauseTime, cycleLength, cycleCount } =
  exerciseTableStore.exerciseTable;
const formData = ref({ restTime, exerciseTime, pauseTime, cycleLength, cycleCount });

const handleChange = (key: keyof TableConfig, event: Event) => {
  formData.value[key] = parseInt((event.target as HTMLInputElement).value);
};

const save = () => {
  exerciseTableStore.setExerciseTableConfig(formData.value);
  emits('close');
};
</script>

<template>
  <DialogComponent :open="props.open">
    <template #header>
      <TypographyComponent> Training Setup </TypographyComponent>
    </template>
    <template #content>
      <InputComponent
        label="Number of cycles"
        type="number"
        :min-value="0"
        :value="formData.cycleCount.toString()"
        @change="(event) => handleChange('cycleCount', event)"
      />
      <InputComponent
        label="Number of exercises"
        type="number"
        :min-value="0"
        :value="formData.cycleLength.toString()"
        @change="(event) => handleChange('cycleLength', event)"
      />
      <InputComponent
        label="Time for exercising"
        type="number"
        :min-value="0"
        :value="formData.exerciseTime.toString()"
        @change="(event) => handleChange('exerciseTime', event)"
      />
      <InputComponent
        label="Time for rest"
        type="number"
        :min-value="0"
        :value="formData.restTime.toString()"
        @change="(event) => handleChange('restTime', event)"
      />
      <InputComponent
        label="Time between cycles"
        type="number"
        :min-value="0"
        :value="formData.pauseTime.toString()"
        @change="(event) => handleChange('pauseTime', event)"
      />
    </template>
    <template #actions>
      <ButtonComponent
        label="Cancel"
        size="small"
        color="secondary"
        @click="() => emits('close')"
      />
      <ButtonComponent label="Save" size="small" @click="save" />
    </template>
  </DialogComponent>
</template>
