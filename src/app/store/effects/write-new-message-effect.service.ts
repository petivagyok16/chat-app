import { ActionTypes } from '../actions';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { SendNewMessageAction } from '../actions'

@Injectable()
export class WriteNewMessageEffectService {

  constructor(private actions$: Actions, private threadsService: ThreadsService) { }

  @Effect({ dispatch: false })
    newMessages$: Observable<any> = this.actions$
      .ofType(ActionTypes.SEND_NEW_MESSAGE_ACTION)
      .switchMap((action: SendNewMessageAction) => this.threadsService.saveNewMessage(action.payload))
}
