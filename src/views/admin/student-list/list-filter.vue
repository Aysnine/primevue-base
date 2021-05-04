<template>
  <div class="pt-6">
    <div class="p-fluid p-grid">
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeInputText
            v-model.trim="params.name"
            type="text"
            maxlength="20"
          />
          <label>Name</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeMultiSelect
            v-model="params.gender"
            :options="genderOptions"
            option-label="name"
          />
          <label>Gender</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeInputNumber
            v-model="params.minAge"
            :min="0"
            :max="params.maxAge"
            mode="decimal"
            :use-grouping="false"
          />
          <label>Min Age</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeInputNumber
            v-model="params.maxAge"
            :min="params.minAge"
            :max="1024"
            mode="decimal"
            :use-grouping="false"
          />
          <label>Max Age</label>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PrimeInputText from 'primevue/inputtext'
import PrimeInputNumber from 'primevue/inputnumber'
import PrimeMultiSelect from 'primevue/multiselect'
import { GENDER_TEXT } from '../../../constants'

export default defineComponent({
  components: {
    PrimeInputNumber,
    PrimeInputText,
    PrimeMultiSelect
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:params'],
  setup() {
    const genderOptions = ref(
      Object.entries(GENDER_TEXT).map(([code, name]) => ({ code, name }))
    )

    return {
      genderOptions
    }
  },
  computed: {
    params: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get(): any {
        return this.modelValue
      },
      set(val: unknown) {
        this.$emit('update:params', val)
      }
    }
  }
})
</script>
