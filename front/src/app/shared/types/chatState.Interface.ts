import {MessageInterface} from "../../chat/types/message.interface";
import {UserInterface} from "../../chat/types/user.interface";
import {NotificationInterface} from "../../chat/types/notification.interface";

export interface ChatStateInterface {
  isSending: boolean
  addedUserId: boolean
  isSendingUser: boolean
  connectedUsers: UserInterface[] | null
  messages: [] | null
  userId: string | null
  notification: string | null
}
