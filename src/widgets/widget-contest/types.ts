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
  id: string
  name: string
  points: number
}


export interface ContestStatus {
  questionIndex: number
  questionActive: boolean
  ranking: RankingUser[]
}
