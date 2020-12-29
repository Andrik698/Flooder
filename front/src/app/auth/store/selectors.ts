import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateInterface} from "../../shared/types/appState.interface";
import {AuthStateInterface} from "../../shared/types/authState.Interface";

export const AuthFeatureSelectors = createFeatureSelector<AppStateInterface, AuthStateInterface>('auth')

export const imageSelector = createSelector(
  AuthFeatureSelectors,
  (auth: AuthStateInterface) => auth.img
)

export const isLoading = createSelector(
  AuthFeatureSelectors,
  (auth: AuthStateInterface) => auth.isLoading
)

export const isCheckingUser = createSelector(
  AuthFeatureSelectors,
  (auth: AuthStateInterface) => auth.isChecking
)

export const statusSelector = createSelector(
  AuthFeatureSelectors,
  (auth: AuthStateInterface) => auth.status
)

export const authSelector = createSelector(
  AuthFeatureSelectors,
  (auth: AuthStateInterface) => auth.activeUsername
)

export const checkNetwork = createSelector(
  AuthFeatureSelectors,
  (auth: AuthStateInterface) => auth.online
)
