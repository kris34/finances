import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {authActions} from './actions'
import {CurrentUserInterface} from 'src/app/shared/types/currentUserInterface'
import {UserService} from '../services/user.service'
import {HttpErrorResponse} from '@angular/common/http'
import {PersistanceService} from 'src/app/shared/services/persistance.service'
import { Router } from '@angular/router'

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(UserService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser)
            return authActions.registerSuccess({currentUser})
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: error.error,
              })
            )
          })
        )
      })
    )
  },
  {functional: true}
)

export const RedirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => { 
     return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => { 
        router.navigateByUrl('/')
      })
     )
  },
  {functional: true, dispatch: false}
)


