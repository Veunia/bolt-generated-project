export interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

export interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}
