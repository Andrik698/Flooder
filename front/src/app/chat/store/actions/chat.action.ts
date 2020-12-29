import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {MessageInterface} from "../../types/message.interface";
import {NotificationInterface} from "../../types/notification.interface";

export const sendMessageAction = createAction(
  ActionTypes.SEND_MESSAGE,
  props<{sendMessage: MessageInterface}>()
)

export const sendMessageSuccessAction = createAction(
  ActionTypes.SEND_MESSAGE_SUCCESS,
  props<{getMessage: MessageInterface}>()
)

export const sendMessageFailureAction = createAction(
  ActionTypes.SEND_MESSAGE_FAILURE
)

export const deleteMessageAction = createAction(
  ActionTypes.DELETE_MESSAGE,
  props<{messageId: string}>()
)

export const deleteMessageSuccessAction = createAction(
  ActionTypes.DELETE_MESSAGE_SUCCESS,
  props<{messageId: string}>()
)

export const deleteMessageFailureAction = createAction(
  ActionTypes.DELETE_MESSAGE_FAILURE
)

export const logoutUserChatAction = createAction(
  ActionTypes.LOGOUT_USER
)

export const chatInitializeAction = createAction(
  ActionTypes.CHAT_INIT
)

export const chatInitializeSuccessAction = createAction(
  ActionTypes.CHAT_INIT_SUCCESS,
  props<{userId: string}>()
)

export const getNotificationAction = createAction(
  ActionTypes.GET_NOTIFICATION,
  props<{notification: string}>()
)

export const chatInitializeFailureAction = createAction(
  ActionTypes.CHAT_INIT_FAILURE
)
