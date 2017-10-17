import { INITIAL_STORE_DATA_STATE, StoreDataState } from './store-data-state';
import { INITIAL_UI_STATE, UiState } from './ui-state';

export interface ApplicationState {
  uiState: UiState;
  storeDataState: StoreDataState;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  uiState: INITIAL_UI_STATE,
  storeDataState: INITIAL_STORE_DATA_STATE,
}