<template>
  <div class="min-h-screen">
    <header
      :class="$style.primeBorder"
      class="border-b flex flex-row h-20 ml-72 px-6 justify-between items-center -sm:px-4 -lg:ml-0"
    >
      <PrimeButton
        icon="pi pi-bars"
        class="p-button-lg p-button-text p-button-plain lg:hidden"
        @click="sidebarActive = true"
      />
      <router-link
        class="flex space-x-2 h-20 items-center justify-center lg:hidden"
        to="/"
      >
        <img class="h-10" src="../../assets/logo.png" />
        <span class="text-3xl">LOGO</span></router-link
      >
      <div class="<lg:hidden"></div>
      <div>
        <PrimeButton
          v-if="theme === 'saga-green'"
          icon="pi pi-moon text-xl"
          class="p-button-rounded p-button-text p-button-plain"
          @click="theme = 'arya-green'"
        />
        <PrimeButton
          v-if="theme === 'arya-green'"
          icon="pi pi-sun text-xl"
          class="p-button-rounded p-button-text p-button-plain"
          @click="theme = 'saga-green'"
        />
      </div>
    </header>
    <aside
      :class="[
        $style.primeBorder,
        $style.sidebar,
        {
          '-lg:(transform -translate-x-full)': !sidebarActive
        }
      ]"
      class="flex flex-col h-full border-r-1 inset-0 transition-transform w-72 z-20 fixed select-none"
    >
      <router-link
        :class="$style.primeBorder"
        class="border-b flex space-x-2 h-20 items-center justify-center"
        to="/"
      >
        <img class="h-10" src="../../assets/logo.png" />
        <span class="text-3xl">LOGO</span></router-link
      >
      <nav class="flex-1 px-3" @click="sidebarActive = false">
        <div :class="$style.menuCategory"></div>
        <div :class="$style.menuItems">
          <router-link
            :class="$style.menuItem"
            :exact-active-class="$style.menuItemActive"
            to="/admin"
            exact
          >
            <DashboardIcon :class="$style.menuItemIcon" />
            <span>Dashboard</span></router-link
          >
        </div>
        <div :class="$style.menuCategory">People</div>
        <div :class="$style.menuItems">
          <router-link
            v-slot="{ href, navigate, isActive }"
            to="/admin/students"
            custom
          >
            <a
              :href="href"
              :class="[
                $style.menuItem,
                {
                  [$style.menuItemActive]:
                    isActive || $route.path.startsWith('/admin/students/')
                }
              ]"
              @click="navigate"
            >
              <StudentIcon :class="$style.menuItemIcon" />
              <span>Students</span></a
            >
          </router-link>
          <router-link
            :class="$style.menuItem"
            :active-class="$style.menuItemActive"
            to="/admin/teachers"
          >
            <TeacherIcon :class="$style.menuItemIcon" />
            <span>Teachers</span></router-link
          >
        </div>
        <div :class="$style.menuCategory">Pages</div>
        <div :class="$style.menuItems">
          <router-link
            :class="$style.menuItem"
            :active-class="$style.menuItemActive"
            to="/admin/xxx"
          >
            <NotFoundIcon :class="$style.menuItemIcon" />
            <span>Not Found</span></router-link
          >
        </div>
      </nav>
    </aside>
    <div
      v-show="sidebarActive"
      class="bg-black bg-opacity-50 inset-0 transition z-10 fixed lg:hidden"
      @click="sidebarActive = false"
    ></div>
    <main :class="$style.content" class="ml-72 -lg:ml-0">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import {
  DegreeHat as StudentIcon,
  UserBusiness as TeacherIcon,
  WaterfallsV as DashboardIcon,
  Electrocardiogram as NotFoundIcon
} from '@icon-park/vue-next'
import PrimeButton from 'primevue/button'

export default defineComponent({
  components: {
    StudentIcon,
    TeacherIcon,
    DashboardIcon,
    NotFoundIcon,
    PrimeButton
  },
  setup() {
    const sidebarActive = ref(false)

    return {
      theme: inject<string>('theme'),
      sidebarActive
    }
  }
})
</script>

<style module>
.primeBorder {
  border-color: var(--surface-d);
}
.sidebar {
  background-color: var(--surface-a);
}
.menuCategory {
  color: var(--text-color-secondary);
  @apply select-none py-3;
}
.menuItems {
  @apply flex flex-col pb-2;
}
.menuItem {
  color: var(--text-color-secondary);
  @apply rounded p-3 items-center transition flex items-center text-lg;
  &:hover {
    background-color: var(--surface-c);
  }
}
.menuItemActive {
  color: var(--primary-color);
  @apply font-semibold;
}
.menuItemIcon {
  @apply text-2xl mr-2;
}
.content {
  :global {
    section {
      @apply px-6 py-8 -sm:px-4;
      background-color: var(--surface-b);
    }
    section:global(.one-full) {
      min-height: calc(100vh - 5rem);
    }
  }
}
</style>
