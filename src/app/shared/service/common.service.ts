import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor(
        private _router: Router,
        private userService: UserService,
    ) {}

    getValue_FromToken(fieldName: string) {
        let token = localStorage.getItem('accessToken');
        let decoded = jwtDecode(token);
        return decoded[fieldName];
    }

    tokenExpired() {
        let token = localStorage.getItem('accessToken');
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now().valueOf() / 1000;

        return decodedToken.exp < currentTime;
    }
    signOut() {
        localStorage.removeItem('accessToken');
        this.userService.user = null;
        this._router.navigate(['sign-in']).then();
    }

    handleRedirection() {
        let userType = this.getValue_FromToken('userType');
        let urlRedirection = '/admin/dashboard';
        if (userType == 'Staff') urlRedirection = '/staff/home';
        if (userType == 'Customer') urlRedirection = '/customer/rdvMng';

        this._router.navigate([urlRedirection]).then();
    }
}
