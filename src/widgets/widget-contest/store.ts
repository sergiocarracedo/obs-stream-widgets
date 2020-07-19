import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Map } from '@/types'
import { Question, ContestStatus, RankingUser, QuestionState } from './types'


const question = {
  index: 0,
  state: QuestionState.Ready,
  answered: 0,
  timePerQuestion: 20
}

const state: Map<any> = {
  questions: [] as Question[],
  status: {
    active: false,
    question: JSON.parse(JSON.stringify(question)),
    ranking: [] as RankingUser[]
  } as ContestStatus
}

const mutations: MutationTree<Map<any>> = {
  SOCKET_SET_TIME_PER_QUESTION: (state: any, time: number) => {
    state.timePerQuestion = time
  },
  SOCKET_SET_QUESTIONS: (state: any, questions: Question[]) => {
    state.questions = questions
  },
  SOCKET_SET_CONTEST_STATUS_QUESTION_INDEX: (state: any, index: number) => {
    state.status.question.index = index
  },
  SOCKET_SET_CONTEST_STATUS_QUESTION_STATE: (state: any, questionState: QuestionState) => {
    state.status.question.state = questionState
  },
  SOCKET_SET_CONTEST_RANKING: (state: any, ranking: RankingUser[]) => {
    state.status.ranking = ranking
  },
  SOCKET_CONTEST_RESET: (state: any) => {
    state.status = {
      question: JSON.parse(JSON.stringify(question)),
      ranking: [] as RankingUser[],
      active: state.status.active
    }
  },
  SOCKET_SET_CONTEST_ACTIVE: (state: any, active: boolean) => {
    state.status.active = active
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
