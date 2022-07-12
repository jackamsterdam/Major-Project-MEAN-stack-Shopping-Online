import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
user: UserModel
unsubscribe: Unsubscribe
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.user = store.getState().authState.user // dont need this only need to subscribe when user comes or goes actually do need it casue if you start out at different page the user wont fill up
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
