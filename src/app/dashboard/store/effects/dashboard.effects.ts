import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  tap,
  withLatestFrom
} from 'rxjs/operators';

// ngrx store
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

// Services import
import { DashboardService } from '../../services';

// store actions import
import {
  DashboardActionTypes,
  LoadDashboardsAction,
  LoadDashboardsSuccessAction,
  LoadDashboardsFailAction,
  AddDashboardsAction,
  SetCurrentDashboardAction
} from '../actions/dashboard.actions';
import {
  UserActionTypes,
  AddCurrentUser,
  Go,
  State,
  getRouteUrl
} from '../../../store';

// helpers import
import {
  getStandardizedDashboards,
  getCurrentDashboardId
} from '../../helpers';

@Injectable()
export class DashboardEffects {
  @Effect()
  currentUserLoaded$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.AddCurrentUser),
    map(
      (action: AddCurrentUser) => new LoadDashboardsAction(action.currentUser)
    )
  );

  @Effect()
  loadAllDashboards$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.LoadDashboards),
    withLatestFrom(this.store.select(getRouteUrl)),
    switchMap(([action, routeUrl]: [LoadDashboardsAction, string]) =>
      this.dashboardService.loadAll().pipe(
        map(
          (dashboards: any[]) =>
            new LoadDashboardsSuccessAction(
              dashboards,
              action.currentUser,
              routeUrl
            )
        ),
        catchError((error: any) => of(new LoadDashboardsFailAction(error)))
      )
    )
  );

  @Effect()
  loadAllDashboardSuccess$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.LoadDashboardsSuccess),
    switchMap((action: LoadDashboardsSuccessAction) => [
      new AddDashboardsAction(getStandardizedDashboards(action.dashboards)),
      new SetCurrentDashboardAction(
        getCurrentDashboardId(
          action.routeUrl,
          action.dashboards,
          action.currentUser
        )
      )
    ])
  );

  @Effect()
  setCurrentDashboard$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.SetCurrentDashboard),
    map(
      (action: SetCurrentDashboardAction) =>
        new Go({ path: [`/dashboards/${action.id}`] })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardService: DashboardService
  ) {}
}
