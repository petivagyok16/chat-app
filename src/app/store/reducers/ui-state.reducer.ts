import { Action } from '@ngrx/store';
import { INITIAL_UI_STATE, UiState } from '../states/ui-state';
import { ActionTypes, ThreadSelectedAction } from '../actions';

export function uiStateReducer(uiState: UiState = INITIAL_UI_STATE, action: Action): UiState {
  switch (action.type) {
    case ActionTypes.THREAD_SELECTED_ACTION:
      return handleThreadSelectedAction(uiState, <ThreadSelectedAction>action);

    default:
    return uiState;
  }
}

function handleThreadSelectedAction(uiState: UiState, action: ThreadSelectedAction) {
  return {
    ...uiState,
    currentThreadId: action.payload
  }
}