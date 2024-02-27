import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from 'app/shared/service/CRUDService';
import { environment } from 'app/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    baseUrl: string = "payments";

    constructor(private _http: HttpClient) {
        this._http = _http;
    }

    save(data: any) {
        return this._http.post<any>(
            `${environment.URL_API}/${this.baseUrl}`,
            data,
        );
    }
}
