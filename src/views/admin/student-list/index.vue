<template>
  <section>
    <PrimeCard>
      <template #title>Students</template>
      <template #subtitle>Student basic information management.</template>
      <template #content>
        <div class="space-y-2 mb-4">
          <div class="flex space-x-2 justify-between">
            <div class="flex space-x-2">
              <router-link :to="$route.path + '/create'">
                <PrimeButton label="New" icon="pi pi-plus" />
              </router-link>
            </div>
            <div class="flex space-x-2">
              <PrimeButton
                type="button"
                icon="pi pi-refresh"
                :disabled="!fetch.isReady.value"
                @click="fetch.execute()"
              />
              <PrimeButton
                v-if="filter.open"
                type="button"
                icon="pi pi-filter-slash"
                @click="filter.open = false"
              />
              <PrimeButton
                v-else
                type="button"
                icon="pi pi-filter"
                @click="filter.open = true"
              />
            </div>
          </div>
          <ListFilter v-if="filter.open" />
        </div>

        <PrimeDataTable
          ref="dataTable"
          :value="dataSource"
          data-key="id"
          paginator
          :rows="10"
          responsive-layout="scroll"
        >
          <PrimeColumn field="name" header="Name" style="min-width: 16rem">
            <template #body>
              <PrimeSkeleton v-if="!fetch.isReady.value" class="min-h-6" />
              <template v-else>hello</template>
            </template>
          </PrimeColumn>
          <PrimeColumn field="gender" header="Gender" style="min-width: 16rem">
            <template #body>
              <PrimeSkeleton v-if="!fetch.isReady.value" class="min-h-6" />
              <template v-else>hello</template>
            </template>
          </PrimeColumn>
          <PrimeColumn field="age" header="Age" style="min-width: 16rem">
            <template #body>
              <PrimeSkeleton v-if="!fetch.isReady.value" class="min-h-6" />
              <template v-else>hello</template>
            </template>
          </PrimeColumn>
          <PrimeColumn
            field="lastUpdateTime"
            header="Active"
            style="min-width: 16rem"
          >
            <template #body>
              <PrimeSkeleton v-if="!fetch.isReady.value" class="min-h-6" />
              <template v-else>hello</template>
            </template>
          </PrimeColumn>
          <PrimeColumn style="min-width: 10rem">
            <template #body>
              <PrimeSkeleton v-if="!fetch.isReady.value" class="min-h-6" />
              <template v-else>hello</template>
            </template>
          </PrimeColumn>
        </PrimeDataTable>
      </template>
    </PrimeCard>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import PrimeDataTable from 'primevue/datatable'
import PrimeButton from 'primevue/button'
import PrimeColumn from 'primevue/column'
import PrimeCard from 'primevue/card'
import PrimeSkeleton from 'primevue/skeleton'
import { useAsyncState } from '@vueuse/core'
import { getStudents } from '../../../api'
import ListFilter from './list-filter.vue'

export default defineComponent({
  components: {
    PrimeDataTable,
    PrimeButton,
    PrimeColumn,
    PrimeCard,
    PrimeSkeleton,
    ListFilter
  },
  setup() {
    const filter = reactive({
      open: false
    })
    const fetch = useAsyncState(() => getStudents(), null)

    return {
      filter,
      fetch,
      dataSource: computed(() =>
        fetch.isReady.value && !fetch.state.value?.data.length
          ? fetch.state.value?.data
          : Array.from({ length: 10 }).map(() => ({
              id: String(Math.random())
            }))
      )
    }
  }
})
</script>
