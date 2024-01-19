<script setup lang="ts">
import ExerciseTableComponent from '@/components/ExerciseTableComponent/ExerciseTableComponent.vue';
import DialogComponent from '@/components/DialogComponent/DialogComponent.vue';
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue';
import Typography from '@/components/TypographyComponent/TypographyComponent.vue';
import { ref } from 'vue';

const isDialogOpen = ref(true);
</script>

<template>
  <main>
    <ExerciseTableComponent />
    <DialogComponent :open="isDialogOpen">
      <template #header>
        <Typography size="large"> Dialog Title </Typography>
      </template>
      <template #content>
        <Typography> Content Header </Typography>
        <Typography color="secondary">
          Content that is maybe a little bit longer than the header
        </Typography>
      </template>
      <template #actions>
        <ButtonComponent label="Cancel" color="secondary" />
        <ButtonComponent label="Save" @click="() => (isDialogOpen = false)" />
      </template>
    </DialogComponent>
  </main>
</template>
