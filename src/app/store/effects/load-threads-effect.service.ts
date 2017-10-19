import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
import { ActionTypes, LoadUserThreadsAction, SelectUserAction, UserThreadsLoadedAction } from '../actions';
import { ThreadsService } from '../../services/threads.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class LoadThreadsEffectService {
  constructor(
    private threadsService: ThreadsService,
    private actions$: Actions
  ) { }

  @Effect()
    userThreads$: Observable<Action> = this.actions$
      .ofType(ActionTypes.LOAD_USER_THREADS_ACTION)
      .debug(val => {console.log('Action received -> ', val)})
      .switchMap((action: LoadUserThreadsAction) => this.threadsService.loadUserThreads(action.payload))
      .debug(data => {console.log('data arrived-> ', data )})
      .map(allUserData => new UserThreadsLoadedAction(allUserData));

  @Effect()
    newUserSelected$: Observable<Action> = this.actions$
      .ofType(ActionTypes.SELECT_USER_ACTION)
      .map((action: SelectUserAction) => new LoadUserThreadsAction(action.payload))
}
