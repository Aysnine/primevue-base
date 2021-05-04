<template>
  <section class="one-full">
    <PrimeCard>
      <template #title>New Student</template>
      <template #content>
        <PrimeSteps :model="steps" readonly />
      </template>
    </PrimeCard>
    <div class="mt-4">
      <router-view
        v-slot="{ Component }"
        :form-data="formObject"
        @prevPage="prevPage($event)"
        @nextPage="nextPage($event)"
        @complete="complete"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PrimeSteps from 'primevue/steps'
import PrimeCard from 'primevue/card'
import { useRouter } from 'vue-router'
import { appendPath } from '../../../utils'

export default defineComponent({
  components: { PrimeSteps, PrimeCard },
  setup() {
    const router = useRouter()
    const [{ path }] = router.currentRoute.value.matched.slice(-2, -1)
    const steps = ref([
      {
        label: 'Personal',
        to: appendPath(path, '')
      },
      {
        label: 'Education',
        to: appendPath(path, 'education')
      },
      {
        label: 'Confirmation',
        to: appendPath(path, 'confirmation')
      }
    ])

    const formObject = ref({})

    const nextPage = (event) => {
      for (let field in event.formData) {
        formObject.value[field] = event.formData[field]
      }

      router.push(steps.value[event.pageIndex + 1].to)
    }
    const prevPage = (event) => {
      router.push(steps.value[event.pageIndex - 1].to)
    }
    const complete = () => {
      console.log('yes', formObject.value)
    }

    return { steps, formObject, nextPage, prevPage, complete }
  }
})
</script>
