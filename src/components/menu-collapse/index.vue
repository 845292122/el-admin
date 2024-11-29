<script setup>
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <div f-c-c cursor-pointer rounded-2 p-8 text-24 transition-all-300 auto-bg-hover @click="appStore.toggleMenuCollapsed">
    <i :class="appStore.menuCollapsed ? 'i-bi:text-indent-left' : 'i-bi:text-indent-right'" />
  </div>
</template>
