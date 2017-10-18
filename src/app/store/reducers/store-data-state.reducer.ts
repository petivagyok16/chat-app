import { ActionTypes, UserThreadsLoadedAction } from '../actions';
import { Action } from '@ngrx/store';
import { StoreDataState } from '../states/store-data-state';
import * as _ from 'lodash';

export function storeDataStateReducer(storeDataState: StoreDataState, action: Action): StoreDataState {
  switch (action.type) {
    case ActionTypes.USER_THREADS_LOADED_ACTION:
      return handleUserThreadsLoadedAction(storeDataState, <UserThreadsLoadedAction>action);

    default:
      return storeDataState;
  }
}

function handleUserThreadsLoadedAction(storeDataState: StoreDataState, action: UserThreadsLoadedAction) {
  return {
    ...storeDataState,
    participants: _.keyBy(action.payload.participants, 'id'),
    threads: _.keyBy(action.payload.threads, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
  }
}