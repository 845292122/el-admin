import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from './guards'
import { staticRoutes } from './routes'

export const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export async function setupRouter(app) {
  app.use(router)
  setupRouterGuard(router)
}
