import { Component, OnInit } from '@angular/core';

import { UiState } from './../../store/states/ui-state';
import { ApplicationState } from './../../store/states/application-state';
import { ClearErrorAction } from './../../store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  message: string;
  
    constructor(private store: Store<ApplicationState>) { }
  
    ngOnInit() {
      this.store
        .select<UiState>((applicationState: ApplicationState) => applicationState.uiState)
        .subscribe((uiState: UiState) => this.message = uiState.currentError);
    }
  
    close() {
      this.store.dispatch(new ClearErrorAction());
    }

}
