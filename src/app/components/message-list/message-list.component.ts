import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  ViewChild,
  SimpleChanges
} from '@angular/core';
import * as _ from 'lodash';

import { MessageVM } from '../../../../shared/model/message'

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnChanges {
  @Input() messages: MessageVM[];
  @ViewChild('list') list: ElementRef;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages']) {
      const previousMessages = changes['messages'].previousValue;
      const newMessages = changes['messages'].currentValue;
      if (previousMessages && newMessages.length > previousMessages.length) {
        setTimeout(() => {
          this.scrollLastMessageIntoView();
        });
      }
    }
  }

  scrollLastMessageIntoView() {
    const items = this.list.nativeElement.querySelectorAll('li');
    const lastItem: any = _.last(items);
    if (lastItem) {
      lastItem.scrollIntoView();
    }
  }
}