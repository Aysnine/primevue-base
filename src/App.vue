<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  mounted() {
    console.log('🚀 App started!')
  }
})
</script>
