import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Map } from '@/interfaces'
import dayjs from 'dayjs'

const state: Map<any> = {
  targetDate: 0 as number,
  textAfter: '',
  textBefore: '',
  clockColor: '#000000FF',
  clockTrackColor: '#00000020'
}

const mutations: MutationTree<Map<any>> = {
  SOCKET_SET_TARGET_DATE: (state, target: Date | number) => {
    state.targetDate = +dayjs(target)
  },
  SOCKET_SET_TEXT_BEFORE: (state, payload: string) => {
    state.textBefore = payload
  },
  SOCKET_SET_TEXT_AFTER: (state, payload: string) => {
    state.textAfter = payload
  },
  SOCKET_SET_CLOCK_COLOR: (state, payload: string) => {
    state.clockColor = payload
  },
  SOCKET_SET_CLOCK_TRACK_COLOR: (state, payload: string) => {
    state.clockTrackColor = payload
  }
}

const actions: ActionTree<Map<any>, any> = {}

const getters: GetterTree<Map<any>, any> = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
