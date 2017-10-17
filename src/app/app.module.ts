import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { UserSelectionComponent } from './components/user-selection/user-selection.component';
import { ThreadSectionComponent } from './components/thread-section/thread-section.component';
import { MessageSectionComponent } from './components/message-section/message-section.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ThreadListComponent } from './components/thread-list/thread-list.component';

// Services
import { ThreadsService } from './services/threads.service';

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
    BrowserModule
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
