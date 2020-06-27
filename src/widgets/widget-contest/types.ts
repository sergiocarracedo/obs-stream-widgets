export interface Answer {
  text: string
  correct: boolean
}
export interface Question {
  title: string
  answers: Answer[]
}

export interface QuestionAnswer {
  points: number
  answer: number
}

export interface RankingUser {
  id: string | number
  name: string
  points: number
}


export interface ContestStatus {
  ranking: RankingUser[],
  question: {
    index: number
    answered: number
    state: QuestionState
  }
}


export enum QuestionState {
  Ready = 'ready',
  Active = 'active',
  Finished = 'finished',
  Ranking = 'ranking'
}
