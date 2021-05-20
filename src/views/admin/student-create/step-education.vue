<template>
  <VeeForm
    v-slot="{ setFieldValue, values }"
    autocomplete="off"
    :validation-schema="validationSchema"
    @submit="onSubmit"
  >
    <PrimeCard>
      <template #subtitle>Education Information</template>
      <template #content>
        <div class="m-auto p-fluid max-w-100">
          <VeeField v-slot="{ field, errorMessage }" name="period">
            <div class="p-field">
              <label class="form-required-mark">Period</label>
              <PrimeDropdown
                :class="{ 'p-invalid': errorMessage }"
                :options="periodOptions"
                option-label="name"
                option-value="code"
                :model-value="field.value"
                @input="
                  field.onInput.forEach((fn) => fn($event.value)),
                    setFieldValue('grade', '')
                "
                @change="
                  field.onChange.forEach((fn) => fn($event.value)),
                    setFieldValue('grade', '')
                "
              />
              <span v-if="errorMessage" class="p-error">{{
                errorMessage
              }}</span>
            </div>
          </VeeField>
          <VeeField
            v-if="values.period"
            v-slot="{ field, errorMessage }"
            name="grade"
          >
            <div class="p-field">
              <label class="form-required-mark">Grade</label>
              <PrimeDropdown
                :class="{ 'p-invalid': errorMessage }"
                :options="
                  gradeOptions.filter((i) =>
                    GRADES_OF_PERIOD[values.period].includes(i.code)
                  )
                "
                option-label="name"
                option-value="code"
                :model-value="field.value"
                @input="field.onInput.forEach((fn) => fn($event.value))"
                @change="field.onChange.forEach((fn) => fn($event.value))"
              />
              <span v-if="errorMessage" class="p-error">{{
                errorMessage
              }}</span>
            </div>
          </VeeField>
          <VeeField v-slot="{ field, errorMessage }" name="campus">
            <div class="p-field">
              <label class="form-required-mark">Campus</label>
              <PrimeDropdown
                :class="{ 'p-invalid': errorMessage }"
                filter
                show-clear
                :options="campusSelector.options"
                option-label="name"
                option-value="code"
                :model-value="field.value"
                @filter="campusSelector.filter"
                @input="field.onInput.forEach((fn) => fn($event.value))"
                @change="field.onChange.forEach((fn) => fn($event.value))"
              />
              <span v-if="errorMessage" class="p-error">{{
                errorMessage
              }}</span>
            </div>
          </VeeField>
        </div>
      </template>
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
            type="submit"
            label="Next"
            icon="pi pi-angle-right"
            icon-pos="right"
          />
        </div>
      </template>
    </PrimeCard>
  </VeeForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PrimeCard from 'primevue/card'
import PrimeButton from 'primevue/button'
import PrimeDropdown from 'primevue/dropdown'
import { GRADES_OF_PERIOD, GRADE_TEXT, PERIOD_TEXT } from '../../../constants'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'

const stepIndex = 1

// campusId
// gender
// grade
// name
// period
// teacherId

export default defineComponent({
  components: {
    PrimeCard,
    PrimeButton,
    PrimeDropdown,
    VeeForm,
    VeeField
  },
  emits: ['nextStep', 'prevStep'],
  setup(_, { emit }) {
    const validationSchema = toFormValidator(
      zod.object({
        period: zod.string().nonempty('This is required'),
        grade: zod.string().nonempty('This is required')
      })
    )

    const onSubmit = (values: any) => {
      emit('nextStep', { stepIndex, formValues: { ...values } })
    }

    const periodOptions = ref(
      Object.entries(PERIOD_TEXT).map(([code, name]) => ({ code, name }))
    )

    const gradeOptions = ref(
      Object.entries(GRADE_TEXT).map(([code, name]) => ({ code, name }))
    )

    const handlePrevious = () => {
      emit('prevStep', { stepIndex })
    }

    const campusSelector = {
      options: [],
      filter() {
        // ...
      }
    }

    return {
      periodOptions,
      gradeOptions,
      validationSchema,
      onSubmit,
      handlePrevious,
      GRADES_OF_PERIOD,
      campusSelector
    }
  }
})
</script>
