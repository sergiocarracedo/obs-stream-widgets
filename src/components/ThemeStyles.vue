<script lang="ts">
import Vue from 'vue'
import themeStyles from '@/helpers/theme'

export default Vue.extend({
  name: 'theme-style',
  computed: {
    themeStyles (): string {
      return themeStyles()
    }
  },
  render: function (createElement) {
    return createElement('style', this.themeStyles)
  }
})
</script>
