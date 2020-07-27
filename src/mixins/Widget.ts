import Vue from 'vue'
export default Vue.extend({
  name: 'widget',
  methods: {
    commitAndEmit (action: string, namespace: string, payload?: any) {
      this.$store.commit(`${namespace ? `${namespace}/` : ''}SOCKET_${action}`, payload === undefined ? null : payload)
      this.$socket.client.emit(action, payload || null)
    }
  }
})
