import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Map } from '@/types'
import { Question, ContestStatus, RankingUser, QuestionState } from './types'


const question = {
  index: 0,
  state: QuestionState.Ready,
  answered: 0
}

const state: Map<any> = {
  questions: [] as Question[],
  status: {
    question: JSON.parse(JSON.stringify(question)),
    ranking: [] as RankingUser[]
  } as ContestStatus
}

const mutations: MutationTree<Map<any>> = {
  SOCKET_SET_QUESTIONS: (state, questions: Question[]) => {
    state.questions = questions
  },
  SOCKET_SET_CONTEST_STATUS_QUESTION_INDEX: (state, index: number) => {
    state.status.question.index = index
  },
  SOCKET_SET_CONTEST_STATUS_QUESTION_STATE: (state, questionState: QuestionState) => {
    state.status.question.state = questionState
  },
  SOCKET_CONTEST_RESET: (state) => {
    state.status = {
      question: JSON.parse(JSON.stringify(question)),
      ranking: [] as RankingUser[]
    }
  }
}

const actions: ActionTree<Map<any>, any> = {}

const getters: GetterTree<Map<any>, any> = {
  currentQuestion (state): Question {
    return state.questions[state.status.question.index]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
