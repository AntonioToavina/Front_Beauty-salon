import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (this.shouldBypassInterceptor(request.url)) {
            return next.handle(request);
        }

        // For other requests, add the token.
        let token = localStorage.getItem('accessToken');

        const modifiedRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(modifiedRequest);
    }

    private shouldBypassInterceptor(url: string): boolean {
        return ['/sign-in', '/sign-up', '/auth-confirmed'].some((endpoint) =>
            url.endsWith(endpoint),
        );
    }
}
