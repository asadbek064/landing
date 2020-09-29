import { Component, ElementRef } from '@angular/core';
import { MobileResizeService } from '../shared/services/mobile-resize.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor( private _mobileResizeService: MobileResizeService,
                        myElement: ElementRef) {
        this._mobileResizeService.componentMethodCalled$
            .subscribe(
                (section) => {
                    let el = myElement.nativeElement.querySelector(section);
                    el.scrollIntoView({behavior: 'smooth'});
                }
            )
    }
}
