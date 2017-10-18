import { ActionTypes, UserThreadsLoadedAction } from '../actions';
import { Action } from '@ngrx/store';
import { StoreDataState } from '../states/store-data-state';
import * as _ from 'lodash';

export function storeDataStateReducer(storeDataState: StoreDataState, action: UserThreadsLoadedAction): StoreDataState {
  switch(action.type) {
    case ActionTypes.USER_THREADS_LOADED_ACTION:
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