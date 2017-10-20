import { Message } from '../../../../shared/model/message';
import { ActionTypes, NewMessagesReceivedAction, SendNewMessageAction, UserThreadsLoadedAction } from '../actions';
import { Action } from '@ngrx/store';
import { StoreDataState } from '../states/store-data-state';
import * as _ from 'lodash';
const uuid = require('uuid/V4');

export function storeDataStateReducer(storeDataState: StoreDataState, action: Action): StoreDataState {
  switch (action.type) {
    case ActionTypes.USER_THREADS_LOADED_ACTION:
      return handleUserThreadsLoadedAction(storeDataState, <UserThreadsLoadedAction>action);

    case ActionTypes.SEND_NEW_MESSAGE_ACTION:
      return handleSendNewMessageAction(storeDataState, <SendNewMessageAction>action);

    case ActionTypes.NEW_MESSAGES_RECEIVED_ACTION:
      return handleNewMessagesReceivedAction(storeDataState, <NewMessagesReceivedAction>action);

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

function handleSendNewMessageAction(storeDataState: StoreDataState, action: SendNewMessageAction) {
  const currentThread = storeDataState.threads[action.payload.threadId];

  const newMessage: Message = {
    text: action.payload.text,
    threadId: action.payload.threadId,
    timestamp: new Date().getTime(),
    participantId: action.payload.participantId,
    id: uuid()
  }
  currentThread.messageIds.push(newMessage.id);
  storeDataState.messages[newMessage.id] = newMessage;

  return {
    ...storeDataState,

  }
}

function handleNewMessagesReceivedAction(storeDataState: StoreDataState, action: NewMessagesReceivedAction): StoreDataState {
  const newStoreDataState = _.cloneDeep(storeDataState);

  const newMessages = action.payload.unreadMessages;
  const currentThreadId =  action.payload.currentThreadId;
  const currentUserId =  action.payload.currentUserId;

  newMessages.forEach( message => {
    newStoreDataState.messages[message.id] = message;
    newStoreDataState.threads[message.threadId].messageIds.push(message.id);

    if (message.threadId !== currentThreadId) {
      newStoreDataState.threads[message.threadId].participants[currentUserId] += 1;
    }
  });

  return newStoreDataState;
}