import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import widgets from '../widgets'
import GlobalSettings from '../views/Settings/Global.vue'
import ThemeSettings from '../views/Settings/Theme.vue'
import ImportExportSettings from '../views/Settings/ImportExport.vue'
import Store from '../store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/settings/global',
    name: 'GlobalSettings',
    component: GlobalSettings,
    meta: {
      layout: 'settings'
    }
  },
  {
    path: '/settings/theme',
    name: 'ThemeSettings',
    component: ThemeSettings,
    meta: {
      layout: 'settings'
    }
  },
  {
    path: '/settings/import-export',
    name: 'ImportExportSettings',
    component: ImportExportSettings,
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
  if (Store.state.contest.status.active && !window.confirm('Contest is active, if you leave you will lost answers. Are you sure?')) {

  } else {
    if (Store.state.contest.status.active) {
      Store.commit('contest/SOCKET_SET_CONTEST_ACTIVE', false)
    }

    if (to.path === '/') {
      next('/settings/global')
    }
    next()
  }
})

export default router
