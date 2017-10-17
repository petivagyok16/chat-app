import { Action } from '@ngrx/store';
import { type } from '../utils/action-type-check';
import { AllUserData } from '../../../shared/to/all-user-data';

export const ActionTypes = {
  LOAD_USER_THREADS_ACTION: type("[Threads] Load user threads"),
};

export class LoadUserThreadsAction implements Action {
  readonly type: string = ActionTypes.LOAD_USER_THREADS_ACTION;
  constructor(public payload: AllUserData) { }
  
}