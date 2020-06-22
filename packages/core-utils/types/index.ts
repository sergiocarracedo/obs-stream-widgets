import { Youtube } from './youtube'
import { Twitch } from './twitch'


export interface Map<T> {
  [key: string]: T
}

export { Youtube, Twitch }
