<template>
  <PrimeCard>
    <template #subtitle>Personal Information</template>
    <template #content> xxx </template>
  </PrimeCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrimeCard from 'primevue/card'

export default defineComponent({
  components: { PrimeCard }
})
</script>
