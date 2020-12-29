export interface MessageInterface {
  username: string,
  userId: string,
  body: string,
  messageId: string,
  date: number,
  avatar: string
  answerMessageId: string | null
  img: string | ArrayBuffer | null
}
