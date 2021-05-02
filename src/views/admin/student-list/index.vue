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
                data.name || EMPTY_TEXT
              }}</WrapperSkeleton></template
            >
          </PrimeColumn>
          <PrimeColumn field="gender" header="Gender">
            <template #body="{ data }"
              ><WrapperSkeleton>{{
                getGenderText(data.gender) ?? EMPTY_TEXT
              }}</WrapperSkeleton></template
            >
          </PrimeColumn>
          <PrimeColumn field="age" header="Age">
            <template #body="{ data }"
              ><WrapperSkeleton>{{
                data.age ?? EMPTY_TEXT
              }}</WrapperSkeleton></template
            >
          </PrimeColumn>
          <PrimeColumn style="width: 5rem">
            <template #body="{ data }">
              <div class="-my-3 text-right">
                <PrimeSkeleton
                  v-if="fetch.pending.value"
                  size="2.4rem"
                  class="inline-flex align-middle"
                />
                <router-link v-else :to="'students/' + data.id">
                  <PrimeButton
                    type="button"
                    icon="pi pi-arrow-right"
                    class="p-button-outlined"
                  />
                </router-link>
              </div>
            </template>
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
import { Gender, getStudents, useAsyncApi } from '../../../api'
import ListFilter from './list-filter.vue'
import PrimeSkeleton from 'primevue/skeleton'
import WrapperSkeleton, {
  INJECT_SHOW
} from '../../../components/WrapperSkeleton.vue'
import { EMPTY_TEXT, GENDER_TEXT } from '../../../constants'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: {
    PrimeDataTable,
    PrimeButton,
    PrimeColumn,
    PrimeCard,
    ListFilter,
    PrimeSkeleton,
    WrapperSkeleton
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const filter = ref(false)

    const firstRecordIndex = ref(Number(route.query.firstRecordIndex) || 0)
    watch(firstRecordIndex, (val) =>
      router.replace({
        path: route.path,
        query: { ...route.query, firstRecordIndex: val }
      })
    )
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
      onPage,
      EMPTY_TEXT
    }
  },
  methods: {
    getGenderText(gender: Gender) {
      return GENDER_TEXT[gender]
    }
  }
})
</script>
