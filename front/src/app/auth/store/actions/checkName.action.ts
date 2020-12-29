import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";

export const checkUserAction = createAction(
  ActionTypes.CHECK_USER,
  props<{ user }>()
)

export const checkUserSuccessAction = createAction(
  ActionTypes.CHECK_USER_SUCCESS,
)

export const checkUserFailureAction = createAction(
  ActionTypes.CHECK_USER_FAILURE
)

export const loginUserAction = createAction(
  ActionTypes.LOGIN_USER,
  props<{ user }>()
)

export const logoutUserAuthAction = createAction(
  ActionTypes.LOGOUT_USER,
)

export const networkEnabled = createAction(
  ActionTypes.ONLINE,
)

export const networkDisabled = createAction(
  ActionTypes.OFFLINE,
)

