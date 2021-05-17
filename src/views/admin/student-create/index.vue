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
        @prevStep="prevStep($event)"
        @nextStep="nextStep($event)"
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
import { useRouter, useRoute } from 'vue-router'
import { appendPath } from '../../../utils'

export default defineComponent({
  components: { PrimeSteps, PrimeCard },
  setup() {
    const router = useRouter()
    const route = useRoute()
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

    // auto back to first
    const isFirstStep = path === route.path
    if (!isFirstStep) {
      router.replace(path)
    }

    const formValues = ref<{}>({})

    const nextStep = (event: any) => {
      for (let field in event.formValues) {
        formValues.value[field] = event.formValues[field]
      }
      router.replace(steps.value[event.stepIndex + 1].to)
    }
    const prevStep = (event: any) => {
      router.replace(steps.value[event.stepIndex - 1].to)
    }
    const complete = () => {
      console.log('yes', formValues.value)
    }

    return { steps, formObject: formValues, nextStep, prevStep, complete }
  }
})
</script>
