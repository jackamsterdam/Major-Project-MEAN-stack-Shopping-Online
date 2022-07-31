import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoleEnum } from '../models/role.enum';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})

export class HomeGuard implements CanActivate {

    public constructor(private notify: NotifyService, private router: Router) { }

    // This function invoked whenever user tries to enter a route required to be logged-in
    // This function should return true if the user is actually logged in, or false if he isn't logged in:
    canActivate(): boolean {
        if (store.getState().authState.token) {
            if (store.getState().authState.user.role === RoleEnum.Admin) {
                this.router.navigateByUrl("/admin-home");
                return false;
            }
            if (store.getState().authState.user.role === RoleEnum.User) {
                return true;
            }

        }

        return true;
    }
}
