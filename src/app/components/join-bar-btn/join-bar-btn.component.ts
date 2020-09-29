import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobileResizeService } from '../../shared/services/mobile-resize.service';

@Component({
  selector: 'app-join-bar-btn',
  templateUrl: './join-bar-btn.component.html',
  styleUrls: ['./join-bar-btn.component.scss']
})
export class JoinBarBtnComponent implements OnInit {

    @Input() Path: string;
    @Input() ButtonName: string;
    @Input() BackgroundColor: string;
    @Input() JoinAs: string;
    
    constructor(private _router: Router,
      private  _mobileResizeService: MobileResizeService) { }

    ngOnInit(): void {
    }

    goTo() {
        this._mobileResizeService.callRegisterMethod(this.JoinAs);
        this._router.navigate([this.Path]);
    }

}
