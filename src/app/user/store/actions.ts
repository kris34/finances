import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store'
import {RegisterRequestInterface} from '../types/RegisterRequestInterface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUserInterface'
import { BackendErrorsInterface } from '../types/backendErrors.interface'

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequestInterface}>(),
    'Register Success': props<{currentUser: CurrentUserInterface}>(),
    'Register Failure': props<{errors: BackendErrorsInterface}>(),
  },
})

/* export const register = createAction(
  '[User] Register',
  props<{request: RegisterRequestInterface}>()
)
 */