<template>
  <v-app>
    <theme-styles></theme-styles>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="(item, key) in menu"
          :key="key"
          link
          :to="{ name: item.to}"
        >
          <v-list-item-action>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small color="primary" @click="updateStateAllInstances">Update state in all instances</v-btn>
    </v-app-bar>
    <v-main>
      <v-container
        fluid
        class="content"
      >
        <v-row
          justify="center"
        >
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <span>Made with <span>❤</span>️ by <a href="https://sergiocarracedo.es">Sergio Carracedo</a></span>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import widgets from '../widgets'
import { Map } from '@/types'
import ThemeStyles from '@/components/ThemeStyles.vue'

export default Vue.extend({
  name: 'settings-layout',
  components: {
    ThemeStyles
  },
  data () {
    return {
      drawer: true,
      menu: [] as Map<any>[]
    }
  },
  methods: {
    updateStateAllInstances () {
      this.$socket.client.emit('STORE_STATE', this.$store.state)
    }
  },
  beforeMount (): void {
    document.body.classList.add('settings')
    this.menu.push({
      name: 'Global',
      icon: 'mdi-wrench',
      to: 'GlobalSettings'
    })

    this.menu.push({
      name: 'Theme',
      icon: 'mdi-palette',
      to: 'ThemeSettings'
    })

    Object.entries(widgets).forEach(([key, value]: any[]) => {
      if (value.settingsComponent) {
        const to = `Settings${key.substr(0, 1).toLocaleUpperCase()}${key.substr(1)}`
        this.menu.push({
          name: value.metadata.name,
          icon: value.metadata.icon || 'mdi-cog',
          to
        })
      }
    })

    this.menu.push({
      name: 'Import-Export',
      icon: 'mdi-swap-vertical',
      to: 'ImportExportSettings'
    })
  }
})
</script>

<style lang="scss">
  .content {
    padding: 25px;
    max-width: 1200px;
  }
</style>
