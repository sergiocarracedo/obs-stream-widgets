<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { Map } from '@/types'

export default Vue.extend({
  name: 'theme-style',
  render: function (createElement) {
    const css: string[] = []

    const theme = (store.state as unknown as Map<any>).theme
    css.push(`.primary-color { color: ${theme.primary};}`)
    css.push(`.primary-stroke { stroke: ${theme.primary};}`)
    css.push(`.primary-border { border-color: ${theme.primary};}`)
    css.push(`.primary-bg { background-color: ${theme.primary};}`)

    css.push(`.primary-light-color { color: ${theme.primaryLight};}`)
    css.push(`.primary-light-stroke { stroke: ${theme.primaryLight};}`)
    css.push(`.primary-light-border { border-color: ${theme.primaryLight};}`)
    css.push(`.primary-light-bg { background-color: ${theme.primaryLight};}`)

    css.push('.text-dark { color: #000 }')

    return createElement('style', css.join('\n'))
  }
})
</script>
