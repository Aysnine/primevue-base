<template>
  <VeeForm
    v-slot="{ setFieldValue, values }"
    autocomplete="off"
    :validation-schema="validationSchema"
    @submit="handleNext"
  >
    <PrimeCard>
      <template #subtitle>Personal Information</template>
      <template #content>
        <div class="m-auto p-fluid max-w-100">
          <VeeField v-slot="{ field, errorMessage }" name="name">
            <div class="p-field">
              <label class="form-required-mark">Name</label>
              <PrimeInputText
                v-bind="field"
                :maxlength="100"
                :class="{ 'p-invalid': errorMessage }"
              />
              <span v-if="errorMessage" class="p-error">{{
                errorMessage
              }}</span>
            </div>
          </VeeField>
          <VeeField v-slot="{ field, errorMessage }" name="gender">
            <div class="p-field">
              <label class="form-required-mark">Gender</label>
              <PrimeDropdown
                :class="{ 'p-invalid': errorMessage }"
                :options="genderOptions"
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

          <VeeField v-slot="{ field, errorMessage }" name="grade">
            <div class="p-field">
              <label class="form-required-mark">Grade</label>
              <PrimeDropdown
                :disabled="!values.period"
                :class="{ 'p-invalid': errorMessage }"
                :options="
                  gradeOptions.filter((i) =>
                    (GRADES_OF_PERIOD[values.period] || []).includes(i.code)
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
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
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
import PrimeInputText from 'primevue/inputtext'
import PrimeDropdown from 'primevue/dropdown'
import {
  GENDER_TEXT,
  GRADES_OF_PERIOD,
  GRADE_TEXT,
  PERIOD_TEXT
} from '../../../constants'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'

const stepIndex = 0

export default defineComponent({
  components: {
    PrimeCard,
    PrimeButton,
    PrimeInputText,
    PrimeDropdown,
    VeeForm,
    VeeField
  },
  emits: ['nextStep'],
  setup(_, { emit }) {
    const validationSchema = toFormValidator(
      zod.object({
        name: zod.string().nonempty('This is required'),
        gender: zod.string().nonempty('This is required'),
        period: zod.string(),
        grade: zod.string()
      })
    )

    const handleNext = (values: any) => {
      emit('nextStep', { stepIndex, formValues: { ...values } })
    }

    const genderOptions = ref(
      Object.entries(GENDER_TEXT).map(([code, name]) => ({ code, name }))
    )

    const periodOptions = ref(
      Object.entries(PERIOD_TEXT).map(([code, name]) => ({ code, name }))
    )

    const gradeOptions = ref(
      Object.entries(GRADE_TEXT).map(([code, name]) => ({ code, name }))
    )

    return {
      genderOptions,
      validationSchema,
      periodOptions,
      gradeOptions,
      GRADES_OF_PERIOD,
      handleNext
    }
  }
})
</script>
