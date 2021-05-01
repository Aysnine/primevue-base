<template>
  <div class="pt-6">
    <div class="p-fluid p-grid">
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeInputText id="inputtext" v-model="value1" type="text" />
          <label for="inputtext">InputText</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label p-input-icon-left">
          <i class="pi pi-search" />
          <PrimeInputText
            id="inputtext-left"
            v-model="valueIconLeft"
            type="text"
          />
          <label for="inputtext-left">Left Icon</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label p-input-icon-right">
          <i class="pi pi-search" />
          <PrimeInputText
            id="inputtext-right"
            v-model="valueIconRight"
            type="text"
          />
          <label for="inputtext-right">Right Icon</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label p-input-icon-right">
          <i class="pi pi-search" />
          <PrimeInputText
            id="inputtext-right"
            v-model="valueIconRight"
            type="text"
          />
          <label for="inputtext-right">Right Icon</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeCalendar id="calendar" v-model="value3" />
          <label for="calendar">Calendar</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeChips id="chips" v-model="value4" />
          <label for="chips">Chips</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeInputMask
            id="inputmask"
            v-model="value5"
            mask="99/99/9999"
            slot-char="mm/dd/yyyy"
          />
          <label for="inputmask">InputMask</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeInputNumber id="inputnumber" v-model="value6" />
          <label for="inputnumber">InputNumber</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <span class="p-float-label">
            <PrimeInputText id="inputgroup" v-model="value7" type="text" />
            <label for="inputgroup">InputGroup</label>
          </span>
        </div>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeDropdown
            id="dropdown"
            v-model="value8"
            :options="cities"
            option-label="name"
          />
          <label for="dropdown">Dropdown</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeDropdown
            id="dropdown"
            v-model="value8"
            :options="cities"
            option-label="name"
          />
          <label for="dropdown">Dropdown</label>
        </span>
      </div>
      <div :class="'p-field p-col-12 p-md-6 p-lg-4 p-xl-3'">
        <span class="p-float-label">
          <PrimeMultiSelect
            id="multiselect"
            v-model="value9"
            :options="cities"
            option-label="name"
          />
          <label for="multiselect">MultiSelect</label>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PrimeCalendar from 'primevue/calendar'
import PrimeChips from 'primevue/chips'
import PrimeInputMask from 'primevue/inputmask'
import PrimeInputNumber from 'primevue/inputnumber'
import PrimeInputText from 'primevue/inputtext'
import PrimeDropdown from 'primevue/dropdown'
import PrimeMultiSelect from 'primevue/multiselect'

export default defineComponent({
  components: {
    PrimeCalendar,
    PrimeChips,
    PrimeInputMask,
    PrimeInputNumber,
    PrimeInputText,
    PrimeDropdown,
    PrimeMultiSelect
  },
  setup() {
    const countries = ref()
    const filteredCountries = ref()
    const cities = ref([
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ])
    const value1 = ref()
    const value2 = ref()
    const value3 = ref()
    const value4 = ref()
    const value5 = ref()
    const value6 = ref()
    const value7 = ref()
    const value8 = ref()
    const value9 = ref()
    const value10 = ref()
    const value11 = ref()
    const valueIconLeft = ref()
    const valueIconRight = ref()
    const selectedCity = ref()
    const cascadeCountries = ref([
      {
        name: 'Australia',
        code: 'AU',
        states: [
          {
            name: 'New South Wales',
            cities: [
              { cname: 'Sydney', code: 'A-SY' },
              { cname: 'Newcastle', code: 'A-NE' },
              { cname: 'Wollongong', code: 'A-WO' }
            ]
          },
          {
            name: 'Queensland',
            cities: [
              { cname: 'Brisbane', code: 'A-BR' },
              { cname: 'Townsville', code: 'A-TO' }
            ]
          }
        ]
      },
      {
        name: 'Canada',
        code: 'CA',
        states: [
          {
            name: 'Quebec',
            cities: [
              { cname: 'Montreal', code: 'C-MO' },
              { cname: 'Quebec City', code: 'C-QU' }
            ]
          },
          {
            name: 'Ontario',
            cities: [
              { cname: 'Ottawa', code: 'C-OT' },
              { cname: 'Toronto', code: 'C-TO' }
            ]
          }
        ]
      },
      {
        name: 'United States',
        code: 'US',
        states: [
          {
            name: 'California',
            cities: [
              { cname: 'Los Angeles', code: 'US-LA' },
              { cname: 'San Diego', code: 'US-SD' },
              { cname: 'San Francisco', code: 'US-SF' }
            ]
          },
          {
            name: 'Florida',
            cities: [
              { cname: 'Jacksonville', code: 'US-JA' },
              { cname: 'Miami', code: 'US-MI' },
              { cname: 'Tampa', code: 'US-TA' },
              { cname: 'Orlando', code: 'US-OR' }
            ]
          },
          {
            name: 'Texas',
            cities: [
              { cname: 'Austin', code: 'US-AU' },
              { cname: 'Dallas', code: 'US-DA' },
              { cname: 'Houston', code: 'US-HO' }
            ]
          }
        ]
      }
    ])

    return {
      countries,
      filteredCountries,
      cities,
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
      value7,
      value8,
      value9,
      value10,
      value11,
      valueIconLeft,
      valueIconRight,
      selectedCity,
      cascadeCountries
    }
  }
})
</script>
