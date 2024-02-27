import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ServiceService } from "app/modules/admin/Management/service.service";
import { StaffService } from "app/modules/admin/Management/staff/staff.service";
import { BookingService } from "app/modules/admin/booking/booking.service";
import { forkJoin } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookingHistoryResolver implements Resolve<any>{
    constructor( private staffService: StaffService, private serviceService: ServiceService, private bookingService: BookingService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return forkJoin([
            this.bookingService.getAll(1,10),
            this.serviceService.getAll(),
            this.staffService.getAll()
            
        ])    }
    
}

