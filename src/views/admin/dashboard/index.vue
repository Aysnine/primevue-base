<template>
  <section>
    <PrimeCard>
      <template #title>Dashboard</template>
      <template #content>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </template>
    </PrimeCard>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrimeCard from 'primevue/card'

export default defineComponent({
  components: { PrimeCard }
})
</script>
