import { Map } from '@/types'
const files = require.context('.', false, /\.ts|\.js$/)
const modules = {} as Map<any>

files.keys().forEach((key : string) => {
  if (key === './index.ts') return
  modules[key.replace(/(\.\/|\.js|\.ts)/g, '')] = files(key).default
})

export default modules
