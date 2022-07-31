import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import store from '../redux/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        // If we have a token: 
        if (store.getState().authState.token) {

            // Duplicate request object:
            request = request.clone({

                // Add jwt header to it: 
                setHeaders: {
                    authorization: "Bearer " + store.getState().authState.token
                }

            });
        }

        // next function to continue to the next interceptor:
        return next.handle(request);
    }

}