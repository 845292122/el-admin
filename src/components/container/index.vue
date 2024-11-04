<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div h-full flex-1 overflow-hidden>
    <div h-full flex-col>
      <!-- 头部 -->
      <div
        h-14
        px-6
        justify-between
        items-center
        sticky
        top-0
        z-1
        flex
        border-b="1px solid #e8e8e8"
      >
        <div flex items-center text-3>
          <div class="mr-2 h-5 w-1 rounded bg-primary" />
          <h2>{{ route?.meta.title }}</h2>
        </div>
        <slot name="action" />
      </div>
      <!-- 内容主体 -->
      <transition name="fade-slide" mode="out-in" appear>
        <div flex-1 p-6 m-3 h-0>
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
