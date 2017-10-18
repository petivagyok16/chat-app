import { Action } from '@ngrx/store';
import { INITIAL_UI_STATE, UiState } from '../states/ui-state';

export function uiStateReducer(uiState: UiState = INITIAL_UI_STATE, action: Action): UiState {
  switch(action.type) {

    

    default:
    return uiState;
  }
}