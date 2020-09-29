import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Subject, Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, shareReplay, delay, filter } from 'rxjs/operators';

type Data = any;

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    url: string;
    selectedBusiness: string;
    options: Observable<Data>;
    private term: Subject<string> = new Subject<string>();
    searchState: boolean;
   
    constructor(private http: HttpClient) {
        // initialize the stream, and store the response.
        this.url = 'http://localhost:3000/beta/beta-nonprofit-search'
        this.options = this.term.pipe(
        debounceTime(400),
        switchMap((term: string) => this.getAutoComplete(term)
        ),
        shareReplay(1)
        );
    }

      // trigger search query
    search(term: string) {
        return this.term.next(term);
    }

    // make an call to backend to get autocomplete options
    getAutoComplete(term: string): Observable<Data> {
        const httpOptions = {
            headers: { 'Content-Type': 'application/json'},
            params: { searchQuery : term}
        };
        return this.http.get(this.url + '/search', httpOptions);
    }
}
