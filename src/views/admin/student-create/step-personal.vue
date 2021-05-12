<template>
  <form autocomplete="off" @submit="submit">
    <PrimeCard>
      <template #subtitle>Personal Information</template>
      <template #content>
        <div class="m-auto p-fluid max-w-100">
          <div class="p-field">
            <label>Name</label>
            <PrimeInputText
              v-model.trim="name"
              type="text"
              :class="{ 'p-invalid': errors.name }"
            />
            <span v-if="errors.name" class="p-error">{{ errors.name }}</span>
          </div>
          <div class="p-field">
            <label>Gender</label>
            <PrimeDropdown
              v-model="gender.value.value"
              :options="genderOptions"
              option-label="name"
              option-value="code"
            />
          </div>
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
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PrimeCard from 'primevue/card'
import PrimeButton from 'primevue/button'
import PrimeInputText from 'primevue/inputtext'
import PrimeDropdown from 'primevue/dropdown'
import { GENDER_TEXT } from '../../../constants'
import { useField, useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'

const stepIndex = 0

export default defineComponent({
  components: {
    PrimeCard,
    PrimeButton,
    PrimeInputText,
    PrimeDropdown
  },
  emits: ['nextStep'],
  setup(_, { emit }) {
    const { handleSubmit, errors } = useForm({
      validationSchema: toFormValidator(
        zod.object({
          name: zod.string().nonempty('This is required')
        })
      )
    })

    const { value: name } = useField('name', undefined, { initialValue: '' })
    const gender = useField('name', undefined, { initialValue: '' })

    const submit = handleSubmit((values) => {
      console.log(values)

      emit('nextStep', { stepIndex, formData: { xxx: 1 } })
    })

    const genderOptions = ref(
      Object.entries(GENDER_TEXT).map(([code, name]) => ({ code, name }))
    )

    return { name, gender, errors, submit, genderOptions }
  }
})
</script>
