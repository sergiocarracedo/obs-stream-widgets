<script lang="ts">
import Vue from 'vue'
import themeStyles from '@/helpers/theme'

export default Vue.extend({
  name: 'theme-style',
  render: function (createElement) {
    return createElement('style', themeStyles())
  }
})
</script>
