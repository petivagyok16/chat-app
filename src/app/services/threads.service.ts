import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { commonHttpHeaders } from './shared/commonHttpHeaders';

import { AllUserData } from '../../../shared/to/all-user-data';
import { SendNewMessageAction } from '../store/actions';
import { Message } from './../../../shared/model/message';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }

  loadUserThreads(userId: number): Observable<AllUserData> {
    if (!userId) {
      return;
    }

    return this.http.get('/api/threads', commonHttpHeaders(userId))
      .map(res => <AllUserData>res.json());
  }

  saveNewMessage(payload: { text: string, threadId: number, participantId: number }): Observable<any> {
    return this.http.post(`/api/threads/${payload.threadId}`,
      JSON.stringify({text: payload.text}),
      commonHttpHeaders(payload.participantId)
    );
  }

  loadNewMessagesForUser(userId: number): Observable<Message[]> {
    return this.http.post('/api/notifications/messages', null, commonHttpHeaders(userId))
      .map(res => res.json().payload);
    // return Observable.of(new Array<Message>());
  }

  // markMessagesAsRead(payload: ThreadSelectedActionPayload): Observable<any> {
  //   // Using PATCH since we are taking on action on the thread, and not creating (POST) or updating (PUT)
  //   return this.http.patch(`/api/threads/${payload.selectedThreadId}`,
  //     JSON.stringify({read: true}),
  //     commonHttpHeaders(payload.currentUserId)
  //   );
  // }

}
