<template>
  <div class="flex min-h-screen justify-center items-center">
    <div class="flex flex-col pb-50 center items-center">
      <h1>Home</h1>

      <div class="min-w-64">
        <PrimeDivider />
      </div>

      <router-link to="/admin">
        <PrimeButton label="Admin" class="p-button-link" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrimeButton from 'primevue/button'
import PrimeDivider from 'primevue/divider'

export default defineComponent({
  components: { PrimeButton, PrimeDivider }
})
</script>
