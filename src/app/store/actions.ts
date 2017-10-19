import { Action } from '@ngrx/store';
import { type } from '../utils/action-type-check';
import { AllUserData } from '../../../shared/to/all-user-data';

export const ActionTypes = {
  USER_THREADS_LOADED_ACTION: type("[Threads] User threads loaded"),
  LOAD_USER_THREADS_ACTION: type("[Threads] Load user threads"),
  THREAD_SELECTED_ACTION: type("[Thread] A thread was selected."),
  SELECT_USER_ACTION: type("[User] New user was selected."),
  SEND_NEW_MESSAGE_ACTION: type("[Message] A new message was sent.")
};

export class LoadUserThreadsAction implements Action {
  readonly type = ActionTypes.LOAD_USER_THREADS_ACTION;
  constructor(public payload: number) { }
}

export class UserThreadsLoadedAction implements Action {
  readonly type: string = ActionTypes.USER_THREADS_LOADED_ACTION;
  constructor(public payload: AllUserData) { }
  
}

export class ThreadSelectedAction implements Action {
  readonly type: string = ActionTypes.THREAD_SELECTED_ACTION;
  constructor(public payload: number) { }
}

export class SelectUserAction implements Action {
  readonly type: string = ActionTypes.SELECT_USER_ACTION;
  constructor(public payload: number) { }
}

export class SendNewMessageAction implements Action {
  readonly type: string = ActionTypes.SEND_NEW_MESSAGE_ACTION;
  constructor(public payload: { text: string, threadId: number, participantId: number }) {}
}