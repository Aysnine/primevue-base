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
                v-if="filter"
                type="button"
                icon="pi pi-filter-slash"
                @click="filter = false"
              />
              <PrimeButton
                v-else
                type="button"
                icon="pi pi-filter"
                @click="filter = true"
              />
            </div>
          </div>
          <ListFilter v-if="filter" />
        </div>

        <PrimeDataTable
          ref="dataTable"
          v-model:first="firstRecordIndex"
          :value="dataSource"
          data-key="id"
          paginator
          lazy
          :rows="10"
          :total-records="fetch.state.value?.total"
          responsive-layout="scroll"
          @page="onPage"
        >
          <template #empty>
            <div
              class="flex flex-col space-y-4 min-h-100 items-center justify-center"
            >
              <span>No records</span>
            </div>
          </template>
          <PrimeColumn field="name" header="Name">
            <template #body>
              <PrimeSkeleton v-if="!fetch.isReady.value" class="min-h-6" />
              <template v-else>hello</template>
            </template>
          </PrimeColumn>
          <PrimeColumn field="gender" header="Gender">
            <template #body>
              <PrimeSkeleton v-if="!fetch.isReady.value" class="min-h-6" />
              <template v-else>hello</template>
            </template>
          </PrimeColumn>
          <PrimeColumn field="age" header="Age">
            <template #body>
              <PrimeSkeleton v-if="!fetch.isReady.value" class="min-h-6" />
              <template v-else>hello</template>
            </template>
          </PrimeColumn>
          <PrimeColumn field="lastUpdateTime" header="Active">
            <template #body>
              <PrimeSkeleton v-if="!fetch.isReady.value" class="min-h-6" />
              <template v-else>hello</template>
            </template>
          </PrimeColumn>
          <PrimeColumn>
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
import { computed, defineComponent, reactive, ref, watch } from 'vue'
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
    const filter = ref(false)
    const firstRecordIndex = ref(0)
    const fetchParams = reactive({ pageIndex: 0, pageSize: 10 })
    const fetch = useAsyncState(() => getStudents(), null)

    watch(fetchParams, () => fetch.execute())

    const total = computed(() => fetch.state.value?.total || 0)
    const dataSource = computed(() =>
      fetch.isReady.value && !fetch.state.value?.data.length
        ? fetch.state.value?.data
        : Array.from({ length: 10 }).map(() => ({
            id: String(Math.random())
          }))
    )

    return {
      fetch,
      filter,
      total,
      dataSource,
      firstRecordIndex,
      onPage: (event: any) => {
        fetchParams.pageIndex = event.page
        fetchParams.pageSize = event.pageCount
      }
    }
  }
})
</script>
