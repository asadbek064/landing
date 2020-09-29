import { Component, OnInit } from '@angular/core';
import { MobileResizeService } from '../shared/services/mobile-resize.service';


@Component({
  selector: 'app-join-beta',
  templateUrl: './join-beta.component.html',
  styleUrls: ['./join-beta.component.scss']
})
export class JoinBetaComponent {

    selection = true;

    _registerAsShopper = false;
    _registerAsBusiness = false;
    _registerAsNonprofit = false;

    constructor( private _mobileResizeService: MobileResizeService, ) {
        this._mobileResizeService.registerAsCalled$
            .subscribe(
                (registerAs) => {
                    if (registerAs === 'shopper' ){
                        this.registerAsShopper();
                    } else if (registerAs === 'business') {
                        this.registerAsBusiness();
                    } else if (registerAs === 'nonprofit') {
                        this.registerAsNonprofit();
                    }
                }
            )
    }

    registerAsShopper() {   
        this.selection = false;
        this._registerAsShopper = true;
    }

    registerAsBusiness() {
        this.selection = false;
        this._registerAsBusiness = true;
     }

    registerAsNonprofit() {
        this.selection = false;
        this._registerAsNonprofit = true;
    }
}
