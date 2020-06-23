export interface ChartAuthor {
  name: string
  profileImageUrl: string
}

export interface ChatMessage {
  id: string
  content: string
  author: ChartAuthor
}
