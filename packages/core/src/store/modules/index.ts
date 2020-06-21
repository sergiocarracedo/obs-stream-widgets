import { ModuleTree } from 'vuex'
const files = require.context('.', false, /\.ts|\.js$/)
const modules = {} as ModuleTree<string>

files.keys().forEach((key: string) => {
  if (key === './index.ts') return
  modules[key.replace(/(\.\/|\.js|\.ts)/g, '')] = files(key).default
})

export default modules
