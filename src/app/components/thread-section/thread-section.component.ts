import { Thread } from '../../../../shared/model/thread';
import { ThreadsService } from '../../services/threads.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { ApplicationState } from '../../store/states/application-state';
import { LoadUserThreadsAction } from '../../store/actions';
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
    private threadsService: ThreadsService,
    private store: Store<ApplicationState>
  ) {
    this.userName$ = this.store
      .skip(1)
      .map(this.mapStateToUserName);
    
    this.unreadMessagesCounter$ = this.store
      .skip(1)
      .map(this.mapStateToUnreadMessagesCounter);

    this.threadSummaries$ = store.select(state => {
      const threads = _.values<Thread>(state.storeDataState.threads);
      return threads.map(thread => {
        
        const names = _.keys(thread.participants).map(participantId => state.storeDataState.participants[participantId].name);

        return { 
          id: thread.id,
          participantNames: null,
          lastMessageText: null,
        }
      });
    })
  }

  private mapStateToUserName(state: ApplicationState): string {
    return state.storeDataState.participants[state.uiState.userId].name;
  }

  private mapStateToUnreadMessagesCounter(state: ApplicationState): number {
    const currentUserId = state.uiState.userId;
    return _.values<Thread>(state.storeDataState.threads)
      .reduce((acc, thread) => acc + thread.participants[currentUserId], 0)
  }

  ngOnInit() {
    this.threadsService.loadUserThreads()
      .subscribe(allUserData => this.store.dispatch(new LoadUserThreadsAction(allUserData)));
  }

}
