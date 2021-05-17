<template>
  <PrimeCard>
    <template #subtitle>Confirmation</template>
    <template #content> xxx </template>
    <template #footer>
      <div class="flex space-x-2 justify-between">
        <PrimeButton
          type="button"
          label="Previous"
          icon="pi pi-angle-left"
          class="p-button-outlined"
          @click="handlePrevious"
        />
        <PrimeButton
          type="button"
          label="Confirm"
          icon="pi pi-check"
          @click="handleComplete"
        />
      </div>
    </template>
  </PrimeCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrimeCard from 'primevue/card'
import PrimeButton from 'primevue/button'

const stepIndex = 2

export default defineComponent({
  components: { PrimeCard, PrimeButton },
  emits: ['complete', 'prevStep'],
  methods: {
    handleComplete() {
      this.$emit('complete')
    },
    handlePrevious() {
      this.$emit('prevStep', { stepIndex })
    }
  }
})
</script>
