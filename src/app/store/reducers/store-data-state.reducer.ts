import { ActionTypes, LoadUserThreadsAction } from '../actions';
import { Action } from '@ngrx/store';
import { StoreDataState } from '../states/store-data-state';
import * as _ from 'lodash';

export function storeDataStateReducer(storeDataState: StoreDataState, action: LoadUserThreadsAction): StoreDataState {
  switch(action.type) {
    case ActionTypes.LOAD_USER_THREADS_ACTION:
      return {
        ...storeDataState,
        participants: _.keyBy(action.payload.participants, 'id'),
        threads: _.keyBy(action.payload.threads, 'id'),
        messages: _.keyBy(action.payload.messages, 'id'),
      }

    default:
      return storeDataState;
  }
}