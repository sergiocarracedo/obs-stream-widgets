import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Map } from '@/types'
import { Question, ContestStatus, RankingUser } from './types'

const state: Map<any> = {
  questions: [] as Question[],
  status: {
    questionIndex: 0,
    questionActive: false,
    ranking: [] as RankingUser[]
  } as ContestStatus
}

const mutations: MutationTree<Map<any>> = {
  SOCKET_SET_QUESTIONS: (state, questions: Question[]) => {
    state.questions = questions
  },
  SOCKET_SET_CONTEST_STATUS_QUESTION_INDEX: (state, index: number) => {
    state.status.questionIndex = index
  },
  SOCKET_SET_CONTEST_STATUS_QUESTION_STATUS: (state, active: boolean) => {
    state.status.questionActive = active
  },
  SOCKET_CONTEST_RESET: (state) => {
    state.status = {
      questionIndex: 0,
      questionActive: false,
      ranking: [] as RankingUser[]
    }
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
