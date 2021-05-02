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
                :disabled="fetch.pending.value"
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
          v-model:first="firstRecordIndex"
          :value="fetch.error.value ? [] : fetch.data.value.data"
          data-key="id"
          paginator
          lazy
          :rows="10"
          :total-records="fetch.data.value.total"
          responsive-layout="scroll"
          @page="onPage"
        >
          <template #empty>
            <div
              class="border-transparent flex flex-col space-y-4 border-b-2 min-h-134 box-content items-center justify-center"
            >
              <template v-if="fetch.error.value">
                <div class="max-w-sm text-red-500 truncate">
                  ERROR: {{ fetch.error.value.message }}
                </div>
                <PrimeButton
                  type="button"
                  icon="pi pi-refresh"
                  label="Retry"
                  :disabled="fetch.pending.value"
                  @click="fetch.execute()"
                />
              </template>
              <span v-else>No records</span>
            </div>
          </template>
          <PrimeColumn field="name" header="Name">
            <template #body="{ data }"
              ><WrapperSkeleton>{{
                data.name || '-'
              }}</WrapperSkeleton></template
            >
          </PrimeColumn>
          <PrimeColumn field="gender" header="Gender">
            <template #body><WrapperSkeleton>hello</WrapperSkeleton></template>
          </PrimeColumn>
          <PrimeColumn field="age" header="Age">
            <template #body><WrapperSkeleton>hello</WrapperSkeleton></template>
          </PrimeColumn>
          <PrimeColumn field="lastUpdateTime" header="Active">
            <template #body><WrapperSkeleton>hello</WrapperSkeleton></template>
          </PrimeColumn>
          <PrimeColumn>
            <template #body><WrapperSkeleton>hello</WrapperSkeleton></template>
          </PrimeColumn>
        </PrimeDataTable>
      </template>
    </PrimeCard>
  </section>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, watch } from 'vue'
import PrimeDataTable from 'primevue/datatable'
import PrimeButton from 'primevue/button'
import PrimeColumn from 'primevue/column'
import PrimeCard from 'primevue/card'
import { getStudents, useAsyncApi } from '../../../api'
import ListFilter from './list-filter.vue'
import WrapperSkeleton, {
  INJECT_SHOW
} from '../../../components/WrapperSkeleton.vue'

export default defineComponent({
  components: {
    PrimeDataTable,
    PrimeButton,
    PrimeColumn,
    PrimeCard,
    ListFilter,
    WrapperSkeleton
  },
  setup() {
    const filter = ref(false)
    const firstRecordIndex = ref(0)
    const fetchParams = reactive({ pageIndex: 0, pageSize: 10 })
    const fetch = useAsyncApi(() => getStudents(fetchParams), {
      data: Array.from({ length: 10 }).map(() => ({
        id: String(Math.random())
      })),
      total: 0
    })
    watch(fetchParams, () => fetch.execute())
    provide(INJECT_SHOW, fetch.pending)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPage = (event: any): any => {
      fetchParams.pageIndex = event.page
      fetchParams.pageSize = event.pageCount
    }

    return {
      fetch,
      filter,
      firstRecordIndex,
      onPage
    }
  }
})
</script>
