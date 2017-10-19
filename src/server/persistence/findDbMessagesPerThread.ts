import { Thread } from '../../../shared/model/thread';
import { Message } from '../../../shared/model/message';
import { dbThreads } from '../db-data';
import { dbMessages } from '../db-data';
import * as _ from 'lodash';

export function findDbMessagesPerThread(thread: Thread) {
  return _.filter(dbMessages, (message: Message) => message.threadId === thread.id);
}