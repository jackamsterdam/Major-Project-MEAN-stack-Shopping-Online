import { UserModel } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { RoleEnum } from 'src/app/models/role.enum';
import { Router } from '@angular/router';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
user: UserModel
  constructor(private router: Router) { }

  ngOnInit(): void {
    //!should i put in app routing a guard to prevent admin from going here instead?? 
    this.user = store.getState().authState.user
    if (this.user.role == RoleEnum.Admin) {
      this.router.navigateByUrl('/admin-home')
  }
}



}
