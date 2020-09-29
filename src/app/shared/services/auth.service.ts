import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Shopper } from '../models/shopper.model';
import { ContactUs } from '../models/contactus.model';
import { Business } from '../models/business.model';
import { Nonprofit } from '../models/nonprofit.model';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class AuthService {
    signatureImg: any;
    AgreementSigned: boolean;
    authToken: any;
    shopper: any;

    private betaShoppersUrl: string;  // URL to Shoppers  api.
    private betaBusinessesUrl: string;  // URL to Business  api.
    private betaNonprofitsUrl: string; // URL to Nonprofit api.
    private contactUsUrl: string; // URL to Contact us api

    constructor(
        private http: HttpClient,
        ) {
            this.betaShoppersUrl =  environment.Beta_Shopper_URL;
            this.betaBusinessesUrl = environment.Beta_Business_URL;
            this.betaNonprofitsUrl = environment.Beta_Nonprofit_URL;
            this.contactUsUrl = environment.ContactUS_URL;

        }

    // Register POST for SHOPPERS, BUSINESSES AND NONPROFITS
    registerShopper(shopper: Shopper): Observable<any> {
        const body = new URLSearchParams();
        body.set('firstName', shopper.firstName);
        body.set('lastName', shopper.lastName);
        body.set('email', shopper.email);
        body.set('password', shopper.email);
        body.set('designated_NonProfit', shopper.designated_NonProfit);
        body.set('zipcode', String(shopper.zipcode));
        body.set('eNewsletter', String(shopper.eNewsletter));

        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.post(this.betaShoppersUrl, body.toString(), options);
    }

    registerBusiness(business: FormData): Observable<Business> {
        business.append('signature', this.signatureImg );
        business.append('type', 'business');
        return this.http.post<any>(this.betaBusinessesUrl, business);
    }

    registerNonprofit(nonprofit: FormData): Observable<Nonprofit> {
        nonprofit.append('signature', this.signatureImg);
        nonprofit.append('type', 'nonprofit');
        return this.http.post<any>(this.betaNonprofitsUrl, nonprofit);
    }

    sendMail(contactUS: ContactUs) {
        return this.http.post<any>(this.contactUsUrl, contactUS);
    }

}

