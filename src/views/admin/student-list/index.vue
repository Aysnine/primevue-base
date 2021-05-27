<template>
  <section class="one-full">
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
          <ListFilter v-if="filter" v-model="filterParams" />
        </div>

        <PrimeDataTable
          v-model:first="firstRecordIndex"
          :rows="paginationParams.pageSize"
          :value="fetch.error.value ? [] : fetch.data.value.data"
          data-key="id"
          paginator
          lazy
          :total-records="fetch.data.value.total"
          responsive-layout="scroll"
          :rows-per-page-options="[10, 20, 50]"
          @page="onPage"
        >
          <template #empty>
            <div
              class="
                border-transparent
                flex flex-col
                space-y-4
                border-b-2
                min-h-134
                box-content
                items-center
                justify-center
              "
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
import { computed, defineComponent, provide, reactive, ref, watch } from 'vue'
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
import { useDebounceFn, useThrottleFn } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { omitUrlSearchParams } from '../../../utils'

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
    const router = useRouter()
    const route = useRoute()

    const filterParams = reactive({
      name: String(route.query.name || '') || undefined,
      gender: String(route.query.gender || '')
        .split(',')
        .filter(Boolean),
      maxAge: Number(route.query.maxAge) || undefined,
      minAge: Number(route.query.minAge) || undefined
    })

    const paginationParams = reactive({
      pageIndex: Number(route.query.pageIndex) || 0,
      pageSize: Number(route.query.pageSize) || 10
    })

    watch(
      filterParams,
      useThrottleFn(() => {
        paginationParams.pageIndex = 0
        fetchTimestamp.value++
      }, 1000)
    )

    watch(
      () => paginationParams.pageSize,
      () => (paginationParams.pageIndex = 0)
    )

    const filter = ref(false)
    watch(filter, (val) => {
      if (!val) {
        Object.assign(
          filterParams,
          Object.fromEntries(Object.keys(filterParams).map((i) => [i]))
        )
      }
    })

    const fetchTimestamp = ref(0)
    watch(
      [paginationParams, fetchTimestamp],
      useDebounceFn(() => fetch.execute(), 100)
    )

    const fetch = useAsyncApi(
      () => {
        const params = {
          ...filterParams,
          ...paginationParams
        }

        router.replace({
          query: omitUrlSearchParams({
            ...params,
            pageIndex: params.pageIndex === 0 ? undefined : params.pageIndex,
            pageSize: params.pageSize === 10 ? undefined : params.pageSize,
            gender: (params.gender || []).join(',') || undefined
          })
        })

        return getStudents(params)
      },
      {
        data: Array.from({ length: paginationParams.pageSize }).map(() => ({
          id: String(Math.random())
        })),
        total: 0
      }
    )
    provide(INJECT_SHOW, fetch.pending)

    const firstRecordIndex = computed({
      get: () => ~~(paginationParams.pageIndex * paginationParams.pageSize),
      set: (val: number) =>
        (paginationParams.pageIndex = ~~(val / paginationParams.pageSize))
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPage = (event: any): any => {
      paginationParams.pageIndex = event.page
      paginationParams.pageSize = event.rows
    }

    return {
      fetch,
      filter,
      filterParams,
      paginationParams,
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
