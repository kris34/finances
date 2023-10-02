import {routerNavigationAction} from '@ngrx/router-store'
import {createFeature, createReducer, on} from '@ngrx/store'
import { CreateStatusStateInterface } from '../state/createStatusState.interface'
import { createStatusActions } from './actions'

const initialState: CreateStatusStateInterface = {
  isSubmitting: false,
  validationErrors: null,
}

const createStatusFeature = createFeature({
  name: 'createStatus',
  reducer: createReducer(
    initialState,
    on(createStatusActions.createStatus, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(createStatusActions.createStatusSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(createStatusActions.createStatusFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
})

export const {
  name: createStatusFeatureKey,
  reducer: createStatusReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createStatusFeature
