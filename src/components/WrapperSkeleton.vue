<template>
  <div class="relative">
    <div :class="{ 'opacity-0': computedShow }">
      <slot />
    </div>
    <div v-if="computedShow" class="inset-0 absolute">
      <PrimeSkeleton class="min-h-6" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref } from 'vue'
import PrimeSkeleton from 'primevue/skeleton'

export const INJECT_SHOW = Symbol()

export default defineComponent({
  components: {
    PrimeSkeleton
  },
  props: {
    show: {
      type: Boolean,
      default: undefined
    }
  },
  setup(props) {
    const injectShow = inject<Ref<boolean>>(INJECT_SHOW)

    const computedShow = computed(() => {
      return props.show ?? injectShow?.value
    })

    return {
      computedShow
    }
  }
})
</script>
