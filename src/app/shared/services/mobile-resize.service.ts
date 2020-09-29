import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { startWith, map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

/* This service will return a true of false when subscribed to it
Use this service to determine when components need to change to mobile view 
or web view*/ 

const QUERY: Map<boolean, string> = new Map([
    [false, '(min-width: 1200px)'],
    [false, '(min-width: 992px)'],
    [true, '(min-width: 768px)'],
    [true, '(min-width: 576px)'],
    [true, '(min-width: 0px)'],
]);

@Injectable({
    providedIn: 'root'
})
export class MobileResizeService {

    private _size$: Observable<boolean>;

    private componentMethodCallSource = new Subject<any>();
    componentMethodCalled$ = this.componentMethodCallSource.asObservable();

    private registerAsSource = new Subject<string>();
    registerAsCalled$ = this.registerAsSource.asObservable();

    constructor( private _router: Router) {
        this._size$ = fromEvent(window, 'resize')
          .pipe(
            startWith(this._getScreenSize()),
            map((event: Event) => {
              return this._getScreenSize();
            }),
            distinctUntilChanged(),
            shareReplay(1)
          )
      }

    public get size$(): Observable<boolean> {
    return this._size$;
  }

  private _getScreenSize(): boolean {
    const [[newSize = false]] = Array.from(QUERY.entries())
        .filter(([size, mediaQuery]) => window.matchMedia(mediaQuery).matches);
    return newSize;
  }
  
    callRegisterMethod(registerType: string) {
        this.registerAsSource.next(registerType);
    }

    callComponentMethod(el: string) {
        this.componentMethodCallSource.next(el);
    }
}
