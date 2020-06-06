import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import widgets from '@/widgets'
import GlobalSettings from '../views/Settings/Global.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/settings',
    name: 'GlobalSettings',
    component: GlobalSettings,
    meta: {
      layout: 'settings'
    }
  }
]

Object.entries(widgets).forEach(([key, value]: any[]) => {
  if (value.settingsComponent) {
    routes.push({
      path: `/settings/${key}`,
      name: `Settings${key.substr(0, 1).toLocaleUpperCase()}${key.substr(1)}`,
      component: value.settingsComponent,
      meta: {
        layout: 'settings'
      }
    })
  }
  routes.push({
    path: `/widget/${key}`,
    name: `Widget${key.substr(0, 1).toLocaleUpperCase()}${key.substr(1)}`,
    component: value.widgetViewComponent
  })
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/settings')
  }
  next()
})

export default router
