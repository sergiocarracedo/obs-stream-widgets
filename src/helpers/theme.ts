import store from '@/store'

export default (): string => {
  let css: string[] =  []

  css.push(`.primary-color { color: ${store.state.theme.primary};}`)
  css.push(`.primary-stroke { stroke: ${store.state.theme.primary};}`)
  css.push(`.primary-bg { background-color: ${store.state.theme.primary};}`)

  css.push(`.primary-light-color { color: ${store.state.theme.primaryLight};}`)
  css.push(`.primary-light-stroke { stroke: ${store.state.theme.primaryLight};}`)
  css.push(`.primary-light-bg { background-color: ${store.state.theme.primaryLight};}`)

  return css.join('\n')
}
