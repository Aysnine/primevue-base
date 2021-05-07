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

    const formObject = ref<any>({})

    const nextStep = (event: any) => {
      for (let field in event.formData) {
        formObject.value[field] = event.formData[field]
      }
      router.push(steps.value[event.stepIndex + 1].to)
    }
    const prevStep = (event: any) => {
      router.push(steps.value[event.stepIndex - 1].to)
    }
    const complete = () => {
      console.log('yes', formObject.value)
    }

    return { steps, formObject, nextStep, prevStep, complete }
  }
})
</script>
