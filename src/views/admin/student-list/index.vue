<template>
  <section>
    <PrimeCard>
      <template #title>Students</template>
      <template #subtitle>Student basic information management.</template>
      <template #content>
        <div class="space-x-2 mb-4">
          <router-link :to="$route + '/create'">
            <PrimeButton label="New" icon="pi pi-plus" />
          </router-link>
          <PrimeButton type="button" icon="pi pi-refresh" />
          <PrimeButton type="button" icon="pi pi-search" />
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
            <template v-if="loading" #body>
              <PrimeSkeleton />
            </template>
          </PrimeColumn>
          <PrimeColumn field="gender" header="Gender" style="min-width: 16rem">
            <template v-if="loading" #body>
              <PrimeSkeleton />
            </template>
          </PrimeColumn>
          <PrimeColumn field="age" header="Age" style="min-width: 16rem">
            <template v-if="loading" #body>
              <PrimeSkeleton />
            </template>
          </PrimeColumn>
          <PrimeColumn
            field="lastUpdateTime"
            header="Active"
            style="min-width: 16rem"
          >
            <template v-if="loading" #body>
              <PrimeSkeleton />
            </template>
          </PrimeColumn>
          <PrimeColumn style="min-width: 10rem">
            <template v-if="loading" #body>
              <PrimeSkeleton />
            </template>
          </PrimeColumn>
        </PrimeDataTable>
      </template>
    </PrimeCard>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import PrimeDataTable from 'primevue/datatable'
import PrimeButton from 'primevue/button'
import PrimeColumn from 'primevue/column'
import PrimeCard from 'primevue/card'
import PrimeSkeleton from 'primevue/skeleton'

export default defineComponent({
  components: {
    PrimeDataTable,
    PrimeButton,
    PrimeColumn,
    PrimeCard,
    PrimeSkeleton
  },
  setup() {
    const dataSource = ref([])
    const loading = ref(true)

    return {
      dataSource: computed(() =>
        loading.value && !dataSource.value.length
          ? Array.from({ length: 10 }).map(() => ({
              id: String(Math.random())
            }))
          : dataSource.value
      ),
      loading
    }
  }
})
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
