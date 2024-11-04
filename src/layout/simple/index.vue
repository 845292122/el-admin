<script setup>
import { useAppStore } from '@/store'
import Sidebar from './sidebar'

const appStore = useAppStore()
</script>

<template>
  <div wh-full flex>
    <div
      flex-col
      flex-shrink-0
      transition-width-300
      :class="appStore.menuCollapsed ? 'w-16' : 'w-55'"
      class="aside-wrapper"
    >
      <Sidebar />
    </div>
    <div w-0 flex-col flex-1>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aside-wrapper {
  box-shadow: 1px 0 5px 1px rgba(0, 0, 0, 0.3);
}
</style>
