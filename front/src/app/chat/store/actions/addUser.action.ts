import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {UserInterface} from "../../types/user.interface";

export const addUserAction = createAction(
  ActionTypes.ADD_USER,
  props<{user: UserInterface}>()
)

export const addUserSuccessAction = createAction(
  ActionTypes.ADD_USER_SUCCESS,
  props<{users: UserInterface[]}>()
)

export const addUserFailureAction = createAction(
  ActionTypes.ADD_USER_FAILURE
)
