<template>
  <PrimeCard>
    <template #subtitle>Education Plan</template>
    <template #content> xxx </template>
    <template #footer>
      <div class="flex justify-between">
        <PrimeButton
          type="button"
          label="Previous"
          icon="pi pi-angle-left"
          class="p-button-outlined"
          @click="handlePrevious"
        />
        <PrimeButton
          type="button"
          label="Next"
          icon="pi pi-angle-right"
          icon-pos="right"
          @click="handleNext"
        />
      </div>
    </template>
  </PrimeCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrimeCard from 'primevue/card'
import PrimeButton from 'primevue/button'

const stepIndex = 1

export default defineComponent({
  components: { PrimeCard, PrimeButton },
  emits: ['nextStep', 'prevStep'],
  methods: {
    handleNext() {
      this.$emit('nextStep', { stepIndex, formData: { xxx: 1 } })
    },
    handlePrevious() {
      this.$emit('prevStep', { stepIndex })
    }
  }
})
</script>
