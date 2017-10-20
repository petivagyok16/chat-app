import { ActionTypes } from '../actions';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { SendNewMessageAction } from '../actions'
import { ErrorOccuredAction, EffectSuccessNoOpAction } from './../actions';

@Injectable()
export class WriteNewMessageEffectService {

  constructor(private actions$: Actions, private threadsService: ThreadsService) { }

  @Effect()
    newMessages$: Observable<any> = this.actions$
      .ofType(ActionTypes.SEND_NEW_MESSAGE_ACTION)
      .switchMap((action: SendNewMessageAction) => {
        return this.threadsService.saveNewMessage(action.payload)
          .map(() => new EffectSuccessNoOpAction()) // Need to send back some action, so doing it this way.  Is this correct??
          .catch(() =>
            Observable.of<Action>(new ErrorOccuredAction(`Error Occurred while saving message at: ${(new Date()).toString()}`))
          );
      });
}
