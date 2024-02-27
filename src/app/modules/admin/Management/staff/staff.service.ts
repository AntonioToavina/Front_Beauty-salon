import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CRUDService } from '../../../../shared/service/CRUDService';

@Injectable({
    providedIn: 'root',
})
export class StaffService extends CRUDService {
    constructor(private http: HttpClient) {
        super(http);
        this.baseUrl = 'staffs';
    }
}
