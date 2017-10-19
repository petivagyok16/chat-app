import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { ApplicationState } from '../../store/states/application-state';
import { UiState } from '../../store/states/ui-state';
import { buildThreadParticipantsList } from '../../shared/buildThreadParticipantsList';
import { MessageVM } from '../../../../shared/model/message'
import { SendNewMessageAction } from '../../store/actions';

@Component({
  selector: 'app-message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent {
  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;
  private uiState: UiState;

  constructor(private store: Store<ApplicationState>) {
    this.participantNames$ = store.select(this.messageParticipantNamesSelector);
    this.messages$ = store.select(this.messagesSelector);
    store.subscribe(state => {
      this.uiState = Object.assign({}, state.uiState);
    });
  }

  public onMessageEnter(input) {
    this.store.dispatch(new SendNewMessageAction({
      text: input.value,
      threadId: this.uiState.currentThreadId,
      participantId: this.uiState.userId
    }));
    input.value = '';
  }

  private messageParticipantNamesSelector(state: ApplicationState): string {
    const currentThreadId = state.uiState.currentThreadId;
  
    if (!currentThreadId) {
      return '';
    }
  
    const currentThread = state.storeDataState.threads[currentThreadId];
    return buildThreadParticipantsList(state, currentThread);
  }

  private currentThreadSelector(state: ApplicationState): number {
    return state.uiState.currentThreadId;
  }

  private messagesSelector(state: ApplicationState): MessageVM[] {
    const currentThreadId = state.uiState.currentThreadId;
  
    if (!currentThreadId) {
      return [];
    }
  
    const messageIds = state.storeDataState.threads[currentThreadId].messageIds;
    const messages = messageIds.map(messageId =>  state.storeDataState.messages[messageId]);
  
    return messages.map(message => {
      return {
        id: message.id,
        text: message.text,
        timestamp: message.timestamp,
        participantName: state.storeDataState.participants[message.participantId].name
      };
    });
  }
}
