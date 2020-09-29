import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MobileResizeService } from '../../shared/services/mobile-resize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    public isMobile: Observable<boolean>;
    
    @ViewChild('drawer') drawer;

    constructor(
                private _router: Router,
                private _mobileResizeService: MobileResizeService) {
                    this.isMobile = this._mobileResizeService.size$;
                }
                

    scroll(sectionID) {
        this._router.navigate(['/home']);
        this._mobileResizeService.callComponentMethod(sectionID);  
    }

}


