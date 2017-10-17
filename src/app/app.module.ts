import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule, Action, ActionReducer } from '@ngrx/store';
import { ApplicationState, INITIAL_APPLICATION_STATE } from './store/states/application-state';

// Components
import { AppComponent } from './app.component';
import { UserSelectionComponent } from './components/user-selection/user-selection.component';
import { ThreadSectionComponent } from './components/thread-section/thread-section.component';
import { MessageSectionComponent } from './components/message-section/message-section.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ThreadListComponent } from './components/thread-list/thread-list.component';

// Services
import { ThreadsService } from './services/threads.service';

// Reducers
import { reducers } from './store/reducers/reducers';

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    MessageListComponent,
    ThreadListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.forRoot(reducers, { initialState: INITIAL_APPLICATION_STATE }),
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
