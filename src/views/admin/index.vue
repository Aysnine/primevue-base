<template>
  <div class="min-h-screen">
    <header
      :class="$style.primeBorder"
      class="border-b flex flex-row h-20 ml-72 pl-6 justify-between items-center -sm:pl-2 -lg:ml-0"
    >
      <ToggleIcon
        size="24"
        class="cursor-pointer opacity-80 transition lg:hidden hover:opacity-100"
        @click="sidebarActive = true"
      />
      <router-link
        :class="$style.primeBorder"
        class="border-b flex space-x-2 h-20 items-center justify-center lg:hidden"
        to="/"
      >
        <img class="h-10" src="../../assets/logo.png" />
        <span class="text-3xl">LOGO</span></router-link
      >
      <div class="<lg:hidden"></div>
      <div>
        <!-- TODO -->
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
            :class="$style.menuItem"
            :active-class="$style.menuItemActive"
            to="/admin/students"
          >
            <StudentIcon :class="$style.menuItemIcon" />
            <span>Students</span></router-link
          >
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
import { defineComponent, ref } from 'vue'
import {
  DegreeHat as StudentIcon,
  UserBusiness as TeacherIcon,
  WaterfallsV as DashboardIcon,
  Electrocardiogram as NotFoundIcon,
  HamburgerButton as ToggleIcon
} from '@icon-park/vue-next'

export default defineComponent({
  components: {
    StudentIcon,
    TeacherIcon,
    DashboardIcon,
    NotFoundIcon,
    ToggleIcon
  },
  setup() {
    const sidebarActive = ref(false)

    return {
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
      @apply px-6 py-8 -sm:px-2;
      background-color: var(--surface-b);
    }
  }
}
</style>
