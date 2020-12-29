import {Action, createReducer, on} from "@ngrx/store";
import {
  chatInitializeAction, chatInitializeFailureAction, chatInitializeSuccessAction,
  deleteMessageAction,
  deleteMessageFailureAction,
  deleteMessageSuccessAction, getNotificationAction,
  logoutUserChatAction,
  sendMessageAction,
  sendMessageFailureAction,
  sendMessageSuccessAction
} from "./actions/chat.action";
import {ChatStateInterface} from "../../shared/types/chatState.Interface";
import {addUserAction, addUserFailureAction, addUserSuccessAction} from "./actions/addUser.action";

const initialState: ChatStateInterface = {
  isSending: false,
  connectedUsers: [],
  messages: [],
  addedUserId: false,
  userId: null,
  isSendingUser: false,
  notification: null,
}

const sendMessageReducer = createReducer(
  initialState,
  on(sendMessageAction, state => ({
    ...state,
    isSending: true
  })),
  on(sendMessageSuccessAction, (state,action) => ({
    ...state,
    isSending: false,
    messages: [...state.messages, action.getMessage]
  })),
  on(sendMessageFailureAction, state => ({
    ...state,
    isSending: false
  })),
  on(getNotificationAction, (state, action) => ({
    ...state,
    notification: action.notification
  })),
  on(deleteMessageAction, state => ({
    ...state,
    isSending: true
  })),
  on(deleteMessageSuccessAction, (state,action) => ({
    ...state,
    isSending: false,
    messages: state.messages.filter(message => message.messageId !== action.messageId)
  })),
  on(deleteMessageFailureAction, state => ({
    ...state,
    isSending: false,
  })),
  on(chatInitializeAction, state => ({
    ...state,
    addedUserId: false,
  })),
  on(chatInitializeSuccessAction, (state,action) => ({
    ...state,
    addedUserId: true,
    userId: action.userId
  })),
  on(chatInitializeFailureAction, state => ({
    ...state,
    addedUserId: false,
  })),
  on(addUserAction, state => ({
    ...state,
    isSendingUser: true
  })),
  on(addUserSuccessAction, (state, action) => ({
    ...state,
    isSendingUser: false,
    connectedUsers: action.users
  })),
  on(addUserFailureAction, state => ({
    ...state,
    isSendingUser: false
  })),
  on(logoutUserChatAction, state => ({
    ...initialState
  })),
);

export function reducer(state, action: Action) {
  return sendMessageReducer(state, action);
}
