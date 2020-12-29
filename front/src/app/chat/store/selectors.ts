import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateInterface} from "../../shared/types/appState.interface";
import {ChatStateInterface} from "../../shared/types/chatState.Interface";


export const sendMessageFeatureSelector = createFeatureSelector<
  AppStateInterface,
  ChatStateInterface
  >('message')

export const isSendSelector = createSelector(
  sendMessageFeatureSelector,
  (chat:ChatStateInterface) => chat.isSending
)
export const messagesSelector = createSelector(
  sendMessageFeatureSelector,
  (chat:ChatStateInterface) => chat.messages
)

export const isAddedUserIdSelector = createSelector(
  sendMessageFeatureSelector,
  (chat:ChatStateInterface) => chat.addedUserId
)

export const userIdSelector = createSelector(
  sendMessageFeatureSelector,
  (chat:ChatStateInterface) => chat.userId
)

export const connectedUsersSelector = createSelector(
  sendMessageFeatureSelector,
  (chat:ChatStateInterface) => chat.connectedUsers
)

export const getNotificationSelector = createSelector(
  sendMessageFeatureSelector,
  (chat:ChatStateInterface) => chat.notification
)
