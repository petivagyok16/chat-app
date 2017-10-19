import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThreadSummary } from '../thread-section/thread-summary.vm';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {
  @Input() threads: ThreadSummary[];
  @Input() currentSelectedThreadId: number;
  @Output() threadSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  public selectThread(threadId) {
    this.threadSelected.next(threadId);
  }


}
