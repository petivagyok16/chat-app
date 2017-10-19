import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { AllUserData } from '../../../shared/to/all-user-data';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }

  loadUserThreads(userId: number): Observable<AllUserData> {
    const headers = new Headers();
    headers.append('userid', userId.toString());

    return this.http.get('/api/threads', { headers })
      .map(res => res.json());
  }

}
