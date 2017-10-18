import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
import { ActionTypes, LoadUserThreadsAction, UserThreadsLoadedAction } from '../actions';
import { ThreadsService } from '../../services/threads.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class LoadThreadsEffectService {
  @Effect() userThreads$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD_USER_THREADS_ACTION)
    .debug(val => {console.log('Action received -> ', val)})
    .switchMap(() => this.threadsService.loadUserThreads())
    .debug(data => {console.log('data arrived-> ', data )})
    .map(allUserData => new UserThreadsLoadedAction(allUserData));

  constructor(
    private threadsService: ThreadsService,
    private actions$: Actions
  ) {

  }

}
