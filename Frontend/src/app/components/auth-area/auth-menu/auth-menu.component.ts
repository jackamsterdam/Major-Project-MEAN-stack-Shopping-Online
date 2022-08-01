import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss']
})
export class AuthMenuComponent implements OnInit, OnDestroy {

  user: UserModel
  unsubscribe: Unsubscribe

  ngOnInit() {
    this.user = store.getState().authState.user
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().authState.user
    })
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

}
