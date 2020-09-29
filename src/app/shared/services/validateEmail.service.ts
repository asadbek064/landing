import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

type Data = any;

@Injectable()
export class ValidateEmailService {

    url: string;

    constructor(
        private http: HttpClient,
    ) {
        this.url = 'http://localhost:3000/beta';

    }

    isEmailAvailable(email: string) {
        const httpOptions = {
            headers: { 'Content-Type': 'application/json'},
            params: { email }
        };
        return this.http.get<any>(this.url + '/validate-email', httpOptions);
    }
}

