import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MobileResizeService } from '../../shared/services/mobile-resize.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    isMobile: Observable<boolean>;

    constructor( private _mobileResizeService: MobileResizeService,
                 private _router: Router,) {
        this.isMobile = this._mobileResizeService.size$;
        
    }

    async scroll(sectionID) {
      this._router.navigate(['/home']);
      await delay(5000);
      this._mobileResizeService.callComponentMethod(sectionID);
    

   
    }
    

}
