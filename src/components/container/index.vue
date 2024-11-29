<script setup>
import { useRoute } from 'vue-router'
import MenuCollapsed from '../menu-collapse'
const route = useRoute()
</script>

<template>
  <div h-full flex-1 overflow-hidden>
    <div h-full flex-col>
      <!-- 头部 -->
      <div h-56 pl-12 pr-24 justify-between items-center sticky top-0 z-1 flex border-b="1px solid #e8e8e8">
        <div flex items-center text-12>
          <MenuCollapsed class="mr-8" />
          <div class="mr-8 h-20 w-4 rounded bg-primary" />
          <h2>{{ route?.meta.title }}</h2>
        </div>
        <slot name="action" />
      </div>
      <!-- 内容主体 -->
      <transition name="fade-slide" mode="out-in" appear>
        <div flex-1 p-24 m-12 h-0>
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
