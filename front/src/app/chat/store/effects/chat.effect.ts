import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  chatInitializeAction,
  deleteMessageAction, logoutUserChatAction,
  sendMessageAction
} from "../actions/chat.action";
import {tap} from "rxjs/operators";
import {SocketService} from "../../../shared/services/socket.service";
import {addUserAction} from "../actions/addUser.action";

@Injectable()
export class ChatEffect {

  constructor(
    private actions$: Actions,
    private socketService: SocketService
    ) {
  }

  chatInit$ = createEffect(() =>
      this.actions$.pipe(
        ofType(chatInitializeAction),
        tap(() => {
          this.socketService.init()
        })
      ),
    {dispatch: false}
  )

  addUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addUserAction),
        tap(({user}) => {
          this.socketService.addUser(user)
        })
      ),
    {dispatch: false}
  )

  message$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessageAction),
      tap(({sendMessage}) => {
        this.socketService.sendMessage(sendMessage)
      })
    ),
    {dispatch: false}
  )

  deleteMessage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(deleteMessageAction),
        tap(({messageId}) => {
          this.socketService.sendIdOfDeleteMessage(messageId)
        })
      ),
    {dispatch: false}
  )

  disconnect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(logoutUserChatAction),
        tap(() => {
          this.socketService.disconnectUser()
        })
      ),
    {dispatch: false}
  )

}
