import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth.service";
import {getImageAction, getImageFailureAction, getImageSuccessAction} from "../actions/getImage.action";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class GetImageEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  getImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getImageAction),
      mergeMap(({imgId}) => {
        return this.authService.getImage(imgId).pipe(
          map((img) => {
            return getImageSuccessAction({img})
          }),
          catchError(() => {
            return of(getImageFailureAction())
          })
        )
      })
    )
  )
}
