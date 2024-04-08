<script setup lang="ts">
const props = defineProps<{
  open: boolean;
}>();
</script>

<template>
  <div
    v-if="props.open"
    class="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center"
  >
    <div class="z-10 mx-4 border border-black rounded overflow-clip w-96">
      <div class="p-4 bg-gray-300 border-b-black border-b">
        <slot name="header" />
      </div>
      <div class="p-4 bg-white flex flex-col gap-2">
        <slot name="content" />
      </div>
      <div class="px-4 py-2 flex flex-row justify-end gap-4 bg-white">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
