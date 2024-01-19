<script setup lang="ts">
import NotesRow from '@/components/NotesComponent/NotesRow.vue';
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-2">
      <NotesRow label="Current Exercise" value="Pull ups" />
      <NotesRow label="Exercise Notes" value="Wide grip" />
    </div>
    <NotesRow label="Upcoming Exercise" value="Push ups" size="normal" />
  </div>
</template>
