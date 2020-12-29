import { Injectable } from '@angular/core';
import {io} from "socket.io-client";
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import {
  chatInitializeSuccessAction,
  deleteMessageSuccessAction, getNotificationAction,
  sendMessageSuccessAction
} from "../../chat/store/actions/chat.action";
import {addUserFailureAction, addUserSuccessAction} from "../../chat/store/actions/addUser.action";
import {fromEvent, merge, Observable, Observer} from "rxjs";
import {map} from "rxjs/operators";
import {networkDisabled, networkEnabled} from "../../auth/store/actions/checkName.action";
import {NotificationInterface} from "../../chat/types/notification.interface";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket

  constructor(private store: Store) {
    localStorage.clear()
    this.createOnline$().subscribe(isOnline => {
      if (isOnline) {
        this.store.dispatch(networkEnabled())
      } else {
        this.store.dispatch(networkDisabled())
      }
    })
  }

  isAuthenticated() {
    let name: string = localStorage.getItem('username')
    return name !== null
  }

  init() {
    this.socket = io(environment.SOCKET_ENDPOINT)

    this.socket.on('userId', (userId: string) => {
      localStorage.setItem('userId', userId)
      this.store.dispatch(chatInitializeSuccessAction({userId}))
    })

    this.socket.on('send users', (users) => {
      this.store.dispatch(addUserSuccessAction({users}))
    })

    this.socket.on('connection', (getMessage) => {
      this.store.dispatch(sendMessageSuccessAction({getMessage}))
    })

    this.socket.on('add message', (getMessage) => {
      this.store.dispatch(sendMessageSuccessAction({getMessage}))
    })

    this.socket.on('delete message', (messageId) => {
      this.store.dispatch(deleteMessageSuccessAction({messageId}))
    })

    this.socket.on('notification', (notification) => {
      this.store.dispatch(getNotificationAction({notification}))
    })
  }

  addUser(user) {
    this.socket.emit('add user', user);
  }

  sendMessage(sendMessage) {
    this.socket.emit('message', sendMessage);
  }

  sendIdOfDeleteMessage(id) {
    this.socket.emit('del message', id);
  }

  disconnectUser() {
    this.socket.emit('out');
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
