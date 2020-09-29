import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MobileResizeService } from '../../shared/services/mobile-resize.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
    public isMobile: Observable<boolean>;

    slides = [
        '../../../assets/image/carousel/1.png',
        '../../../assets/image/carousel/2.png',
    ]
    constructor(private _mobileResizeService: MobileResizeService) {
        this.isMobile = this._mobileResizeService.size$;
    }

}
