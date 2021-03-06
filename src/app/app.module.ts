import { BrowserModule } from '@angular/platform-browser';
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StoreModule, Action, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { INITIAL_APPLICATION_STATE } from './store/states/application-state';
import { routes } from './routes';

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

// Effects
import { RouterEffects } from './store/router/effects';
import { LoadThreadsEffectService } from './store/effects/load-threads-effect.service';
import { WriteNewMessageEffectService } from './store/effects/write-new-message-effect.service';
import { MessagesComponent } from './components/messages/messages.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    MessageListComponent,
    ThreadListComponent,
    MessagesComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers, { initialState: INITIAL_APPLICATION_STATE }),
    EffectsModule.forRoot([RouterEffects, LoadThreadsEffectService, WriteNewMessageEffectService]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
