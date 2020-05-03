const files = require.context('.', true, /index\.ts|index\.js$/)
const widgets = {} as any

files.keys().forEach((key: string) => {
  if (key === './index.ts') return
  const id = key
    .replace(/(\.\/|index\.js|index\.ts)/g, '')
    .replace(/\/\s*$/g, '')
  widgets[id] = {
    file: key,
    widgetComponent: files(key).widgetComponent,
    settingsComponent: files(key).settingsComponent || null,
    store: files(key).store || null,
    metadata: files(key).metadata
  }
})

export default widgets
