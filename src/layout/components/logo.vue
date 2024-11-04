<script setup>
import Logo from '@/assets/vue.svg'
import { useAppStore } from '@/store'

const appStore = useAppStore()
const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div flex justify-center items-center f-c-c h-14>
    <img :src="Logo" alt="logo" />
    <h2
      v-show="!appStore.menuCollapsed"
      ml-2
      max-w-30
      flex-shrink-0
      text-4
      color-primary
      font-bold
    >
      {{ title }}
    </h2>
  </div>
</template>

<style lang="scss" scoped></style>
