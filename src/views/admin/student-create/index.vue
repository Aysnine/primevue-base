<template>
  <section class="one-full">
    <PrimeCard>
      <template #title>New Student</template>
      <template #content>
        <PrimeSteps :model="steps" />
      </template>
    </PrimeCard>
    <PrimeCard class="mt-4">
      <template #subtitle>Personal Information</template>
      <template #content> xxx </template>
    </PrimeCard>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PrimeSteps from 'primevue/steps'
import PrimeCard from 'primevue/card'

export default defineComponent({
  components: { PrimeSteps, PrimeCard },
  setup() {
    const steps = ref([
      {
        label: 'Personal',
        to: '/steps'
      },
      {
        label: 'Seat',
        to: '/steps/seat'
      },
      {
        label: 'Payment',
        to: '/steps/payment'
      },
      {
        label: 'Confirmation',
        to: '/steps/confirmation'
      }
    ])
    return {
      steps
    }
  }
})
</script>
