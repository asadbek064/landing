import { Component, Input  } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { MobileResizeService } from 'src/app/shared/services/mobile-resize.service';

@Component({
  selector: 'app-learn-more-btn',
  templateUrl: './learn-more-btn.component.html',
  styleUrls: ['./learn-more-btn.component.scss']
})
export class LearnMoreBtnComponent  {

    @Input() BackgroundColor: string;
    @Input() Path: string;
    @Input() ButtonName: string;
    constructor( private _router: Router,  
                 private _mobileResizeService: MobileResizeService) {
      
  }

    goTo() {
       this._router.navigate([this.Path]);
    }
}
