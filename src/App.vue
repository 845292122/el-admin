<script setup>
import { useRoute } from 'vue-router'

const locale = ref('zh-cn')
const btnConfig = reactive({
  autoInsertSpace: true
})
const route = useRoute()
const layouts = new Map()

function getLayout(name) {
  // 利用map将加载过的layout缓存起来，防止重新加载layout导致页面闪烁
  if (layouts.get(name)) return layouts.get(name)
  const layout = markRaw(defineAsyncComponent(() => import(`@/layout/${name}/index.vue`)))
  layouts.set(name, layout)
  return layout
}

const defaultLayout = 'simple'
const Layout = computed(() => {
  if (!route.matched?.length) return null
  return getLayout(route.meta?.layout || defaultLayout)
})
</script>

<template>
  <el-config-provider :locale="locale" :button="btnConfig">
    <router-view v-slot="{ Component, route: curRoute }">
      <component :is="Layout">
        <component :is="Component" :key="curRoute.fullPath" />
      </component>
    </router-view>
  </el-config-provider>
</template>
