export enum ActionTypes {
  SEND_MESSAGE= '[Chat] Send message',
  SEND_MESSAGE_SUCCESS= '[Chat] Send message success',
  SEND_MESSAGE_FAILURE= '[Chat] Send message failure',

  ADD_USER = '[Chat] Add user',
  ADD_USER_SUCCESS = '[Chat] add user success',
  ADD_USER_FAILURE = '[Chat] add user failure',

  DELETE_MESSAGE = '[Chat] Delete message',
  DELETE_MESSAGE_SUCCESS = '[Chat] Delete message success',
  DELETE_MESSAGE_FAILURE = '[Chat] Delete message failure',

  CHAT_INIT = '[Chat] Chat init',
  CHAT_INIT_SUCCESS = '[Chat] Chat init success',
  CHAT_INIT_FAILURE = '[Chat] Chat init failure',

  LOGOUT_USER = '[Chat] Logout user',

  GET_NOTIFICATION = '[Chat] Get notification',
}
