import { ActionReducerMap } from '@ngrx/store';
import { Action } from '@ngrx/store';

import { ApplicationState } from '../states/application-state';
import { uiStateReducer } from './ui-state.reducer';
import { storeDataStateReducer } from './store-data-state.reducer';

export const reducers: ActionReducerMap<ApplicationState> = {
  storeDataState: storeDataStateReducer,
  uiState: uiStateReducer
};