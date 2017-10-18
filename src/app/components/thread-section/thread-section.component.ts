import { Thread } from '../../../../shared/model/thread';
import { ThreadsService } from '../../services/threads.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { ApplicationState } from '../../store/states/application-state';
import { LoadUserThreadsAction, ThreadSelectedAction } from '../../store/actions';
import { ThreadSummary } from './thread-summary.vm';

@Component({
  selector: 'app-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {
  public userName$: Observable<string>;
  public unreadMessagesCounter$: Observable<number>;
  public threadSummaries$: Observable<ThreadSummary[]>;

  constructor(
    private store: Store<ApplicationState>
  ) {
    this.store.subscribe(console.log);
    this.userName$ = this.store.select(this.userNameSelector);
    this.unreadMessagesCounter$ = this.store.map(this.mapStateToUnreadMessagesCounter);
    this.threadSummaries$ = store.select(this.mapStateToThreadSummaries);
  }

  private mapStateToThreadSummaries(state: ApplicationState): ThreadSummary[] {
    const threads = _.values<Thread>(state.storeDataState.threads);
    return threads.map(thread => {
      const names = Object.keys(thread.participants).map(participantId => state.storeDataState.participants[participantId].name);
      const lastMessageId = _.last(thread.messageIds);

      return { 
        id: thread.id,
        participantNames: _.join(names, ", "),
        lastMessageText: state.storeDataState.messages[lastMessageId].text,
        timestamp: state.storeDataState.messages[lastMessageId].timestamp,
      }
    });
  }

  private userNameSelector(state: ApplicationState): string {
    const currentUserId = state.uiState.userId;
    const currentParticipant = state.storeDataState.participants[currentUserId];

    if (!currentParticipant) {
      return "";
    }

    return currentParticipant.name;
  }

  private mapStateToUnreadMessagesCounter(state: ApplicationState): number {
    const currentUserId = state.uiState.userId;
    return _.values<Thread>(state.storeDataState.threads)
      .reduce((acc, thread) => acc + (thread.participants[currentUserId] || 0), 0)
  }

  ngOnInit() {
    this.store.dispatch(new LoadUserThreadsAction())
  }

  public onThreadSelected(threadId: number) {
    this.store.dispatch(new ThreadSelectedAction(threadId))
  }

}
