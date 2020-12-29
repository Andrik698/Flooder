import {AuthStateInterface} from "../../shared/types/authState.Interface";
import {Action, createReducer, on} from "@ngrx/store";
import {getImageAction, getImageFailureAction, getImageSuccessAction} from "./actions/getImage.action";
import {ResponseImageInterface} from "../types/responseImage.interface";
import {
  checkUserAction,
  checkUserFailureAction,
  checkUserSuccessAction,
  loginUserAction, logoutUserAuthAction, networkDisabled, networkEnabled
} from "./actions/checkName.action";

const initialState: AuthStateInterface = {
  isLoading: false,
  img: null,
  isChecking: false,
  status: null,
  activeUsername: null,
  online: null,
}

const getImageReducer = createReducer(
  initialState,
  on(networkEnabled, (state): AuthStateInterface => ({
    ...state,
    online: true
  })),
  on(networkDisabled, (state): AuthStateInterface => ({
    ...state,
    online: false
  })),
  on(getImageAction, (state): AuthStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getImageSuccessAction, (state, action ): AuthStateInterface => ({
    ...state,
    isLoading: false,
    img: action.img
  })),
  on(getImageFailureAction, (state): AuthStateInterface => ({
    ...state,
    isLoading: false
  })),
  on(checkUserAction, (state): AuthStateInterface => ({
    ...state,
    isChecking: true,
    status: null
  })),
  on(checkUserSuccessAction, (state): AuthStateInterface => ({
    ...state,
    isChecking: false,
    status: true
  })),
  on(checkUserFailureAction, (state): AuthStateInterface => ({
    ...state,
    isChecking: false,
    status: false
  })),
  on(loginUserAction, (state, action): AuthStateInterface => ({
    ...state,
    activeUsername: action.user
  })),
  on(logoutUserAuthAction, (state): AuthStateInterface => ({
    ...initialState
  })),
)

export function reducer(state: AuthStateInterface, action: Action) {
  return getImageReducer(state, action)
}
