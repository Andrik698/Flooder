import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth.service";
import {getImageAction, getImageFailureAction, getImageSuccessAction} from "../actions/getImage.action";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {checkUserAction, checkUserFailureAction, checkUserSuccessAction} from "../actions/checkName.action";

@Injectable()
export class CheckUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  checkUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkUserAction),
      mergeMap(({user}) => {
        return this.authService.checkCurrentUser(user).pipe(
          map((response: boolean) => {
            if (response) {
              return checkUserSuccessAction()
            } else {
              return checkUserFailureAction()
            }
          })
        )
      })
    )
  )
}
