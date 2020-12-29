import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {ResponseImageInterface} from "../../types/responseImage.interface";

export const getImageAction = createAction(
  ActionTypes.GET_IMAGE,
  props<{ imgId: number }>()
)

export const getImageSuccessAction = createAction(
  ActionTypes.GET_IMAGE_SUCCESS,
  props<{ img: ResponseImageInterface }>()
)

export const getImageFailureAction = createAction(
  ActionTypes.GET_IMAGE_FAILURE
)
