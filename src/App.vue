<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, provide, ref, watch } from 'vue'
import { changePrimeTheme } from './utils'

export default defineComponent({
  name: 'App',
  setup() {
    const theme = ref('saga-green')
    provide('theme', theme)
    watch(theme, (targetTheme) => changePrimeTheme(targetTheme))
  },
  mounted() {
    console.log('🚀 App started!')
  }
})
</script>
