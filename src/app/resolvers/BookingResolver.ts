import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { StaffService } from '../modules/admin/Management/staff/staff.service';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ServiceService } from '../modules/admin/Management/service.service';

@Injectable({
    providedIn: 'root',
})
export class BookingResolver implements Resolve<any> {
    constructor(private _serviceService: ServiceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return forkJoin([this._serviceService.getAll()]);
    }
}
