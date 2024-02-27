import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CRUDService } from '../../../../shared/service/CRUDService';
import { CommonService } from '../../../../shared/service/common.service';

@Injectable({
    providedIn: 'root',
})
export class StaffService extends CRUDService {
    constructor(
        private http: HttpClient,
        private _commonService: CommonService,
    ) {
        super(http);
        this.baseUrl = 'staffs';
    }

    getStaffFromService(serviceId: string) {
        let userId = this._commonService.getValue_FromToken('id');
        return this._http.get<any>(
            `${environment.URL_API}/${this.baseUrl}/users/${userId}/services/${serviceId}`,
        );
    }
}
