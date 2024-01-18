<script setup lang="ts">
import Button from '@/components/ButtonComponent/ButtonComponent.vue';
</script>

<template>
  <main>
    <Button label="Click Me!" @click="console.log('button 1')" />
    <Button label="Click Me!" color="secondary" @click="console.log('button 2')" />
    <Button label="Click Me!" color="special" @click="console.log('button 3')" />
    <Button label="Click Me!" size="small" @click="console.log('button 4')" />
    <Button label="Click Me!" color="secondary" size="small" @click="console.log('button 5')" />
    <Button label="Click Me!" color="special" size="small" @click="console.log('button 6')" />
    <Button label="Click Me!" is-pill @click="console.log('button 7')" />
    <Button label="Click Me!" color="secondary" is-pill @click="console.log('button 8')" />
    <Button label="Click Me!" color="special" is-pill @click="console.log('button 9')" />
    <Button label="Click Me!" size="small" is-pill @click="console.log('button 10')" />
    <Button
      label="Click Me!"
      color="secondary"
      size="small"
      is-pill
      @click="console.log('button 11')"
    />
    <Button
      label="Click Me!"
      color="special"
      size="small"
      is-pill
      @click="console.log('button 12')"
    />
  </main>
</template>
