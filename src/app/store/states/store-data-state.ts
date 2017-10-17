import { Message } from '../../../../shared/model/message';
import { Thread } from '../../../../shared/model/thread';
import { Participant } from '../../../../shared/model/participant';

export interface StoreDataState {
  participants: { [key: number]: Participant };
  threads: { [key: number]: Thread };
  messages: { [key: number]: Message };
}

export const INITIAL_STORE_DATA_STATE: StoreDataState = {
  threads: {},
  participants: {},
  messages: {},
}