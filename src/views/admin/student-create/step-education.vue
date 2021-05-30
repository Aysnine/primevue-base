<template>
  <VeeForm
    v-slot="{ values }"
    autocomplete="off"
    :validation-schema="validationSchema"
    @submit="handleNext"
  >
    <PrimeCard>
      <template #subtitle>Education Information</template>
      <template #content>
        <div class="m-auto p-fluid max-w-100">
          <VeeField v-slot="{ field, errorMessage }" name="campus">
            <div class="p-field">
              <label class="form-required-mark">Campus</label>
              <PrimeDropdown
                filter
                :class="{ 'p-invalid': errorMessage }"
                :options="
                  asyncCampusOptions.error.value
                    ? []
                    : asyncCampusOptions.data.value.data
                "
                option-label="name"
                :loading="asyncCampusOptions.pending.value"
                :model-value="field.value"
                @change="field.onChange.forEach((fn) => fn($event.value))"
                @filter="searchCampus($event.value)"
              />
              <span v-if="errorMessage" class="p-error">{{
                errorMessage
              }}</span>
            </div>
          </VeeField>

          <VeeField v-slot="{ field, errorMessage }" name="adminTeacher">
            <div class="p-field">
              <label class="form-required-mark">Admin Teacher</label>
              <PrimeDropdown
                filter
                :class="{ 'p-invalid': errorMessage }"
                :options="
                  asyncTeacherOptions.error.value
                    ? []
                    : asyncTeacherOptions.data.value.data
                "
                option-label="name"
                :loading="asyncTeacherOptions.pending.value"
                :model-value="field.value"
                @change="field.onChange.forEach((fn) => fn($event.value))"
                @filter="searchTeacher($event.value)"
              />
              <span v-if="errorMessage" class="p-error">{{
                errorMessage
              }}</span>
            </div>
          </VeeField>

          <PrimeMessage
            v-if="
              values.campus &&
              values.adminTeacher &&
              values.adminTeacher.campus.id !== values.campus.id
            "
            severity="warn"
            >Warning PrimeMessage Content</PrimeMessage
          >
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
import { defineComponent } from 'vue'
import PrimeCard from 'primevue/card'
import PrimeButton from 'primevue/button'
import PrimeMessage from 'primevue/message'
import PrimeDropdown from 'primevue/dropdown'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'
import { getCampuses, getTeachers, useAsyncApi } from '../../../api'
import { useThrottleFn } from '@vueuse/shared'

const stepIndex = 1

export default defineComponent({
  components: {
    PrimeCard,
    PrimeButton,
    PrimeMessage,
    PrimeDropdown,
    VeeForm,
    VeeField
  },
  emits: ['nextStep', 'prevStep'],
  setup(_, { emit }) {
    const validationSchema = toFormValidator(
      zod.object({
        campus: zod.object({ id: zod.string(), name: zod.string() }).required(),
        adminTeacher: zod
          .object({ id: zod.string(), name: zod.string() })
          .required()
      })
    )

    const handleNext = (values: any) => {
      emit('nextStep', { stepIndex, formValues: { ...values } })
    }

    const asyncCampusOptions = useAsyncApi(
      (keywords) =>
        getCampuses({ pageIndex: 0, pageSize: 10, name: keywords as string }),
      { data: [], total: 0 }
    )

    const searchCampus = useThrottleFn((keywords: string) => {
      asyncCampusOptions.execute(keywords)
    }, 500)

    const asyncTeacherOptions = useAsyncApi(
      (keywords) =>
        getTeachers({ pageIndex: 0, pageSize: 10, name: keywords as string }),
      { data: [], total: 0 }
    )

    const searchTeacher = useThrottleFn((keywords: string) => {
      asyncTeacherOptions.execute(keywords)
    }, 500)

    const handlePrevious = () => {
      emit('prevStep', { stepIndex })
    }

    return {
      validationSchema,
      asyncCampusOptions,
      searchCampus,
      asyncTeacherOptions,
      searchTeacher,
      handleNext,
      handlePrevious
    }
  }
})
</script>
