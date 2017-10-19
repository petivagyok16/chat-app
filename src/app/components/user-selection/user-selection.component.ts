import { SelectUserAction } from '../../store/actions';
import { ApplicationState } from '../../store/states/application-state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

  onSelectUser(newUserId: number) {
    this.store.dispatch(new SelectUserAction(newUserId));
  }

}
