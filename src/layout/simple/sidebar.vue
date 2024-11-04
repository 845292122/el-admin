<script setup>
import { useAppStore } from '@/store'
import Logo from '../components/logo'
import Menu from '../components/menu'
import MenuCollapse from '../components/menu-collapse'
import Profile from '../components/profile'

const appStore = useAppStore()
</script>

<template>
  <Logo border-b="1px solid #e8e8e8" />
  <Menu h-0 flex-1 mt-1 />
  <div my-3 flex items-center justify-around px-3>
    <Profile v-if="!appStore.menuCollapsed" />
    <MenuCollapse />
  </div>
</template>
