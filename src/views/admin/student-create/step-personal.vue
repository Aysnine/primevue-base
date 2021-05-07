<template>
  <PrimeCard>
    <template #subtitle>Personal Information</template>
    <template #content>
      <div class="m-auto p-fluid max-w-100">
        <div class="p-field">
          <label>Name</label>
          <PrimeInputText v-model.trim="name" type="text" />
        </div>
        <div class="p-field">
          <label>Gender</label>
          <PrimeDropdown
            v-model="gender"
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
import { defineComponent, ref } from 'vue'
import PrimeCard from 'primevue/card'
import PrimeButton from 'primevue/button'
import PrimeInputText from 'primevue/inputtext'
import PrimeDropdown from 'primevue/dropdown'
import { GENDER_TEXT } from '../../../constants'

const stepIndex = 0

export default defineComponent({
  components: {
    PrimeCard,
    PrimeButton,
    PrimeInputText,
    PrimeDropdown
  },
  emits: ['nextStep'],
  setup() {
    const name = ref('')
    const gender = ref(null)
    const genderOptions = ref(
      Object.entries(GENDER_TEXT).map(([code, name]) => ({ code, name }))
    )

    return { name, gender, genderOptions }
  },
  methods: {
    handleNext() {
      this.$emit('nextStep', { stepIndex, formData: { xxx: 1 } })
    }
  }
})
</script>
