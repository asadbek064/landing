import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MobileResizeService } from '../../shared/services/mobile-resize.service';

@Component({
  selector: 'app-container-how-it-works',
  templateUrl: './container-how-it-works.component.html',
  styleUrls: ['./container-how-it-works.component.scss']
})
export class ContainerHowItWorksComponent implements OnInit {

    LearnMoreColor: string;
    LearnMorePath: string;
    LearnMoreName: string;
    breakpoint: number;
    VideoUrl: any;
    public isMobile: Observable<boolean>;

    constructor(  private _sanitizer: DomSanitizer,
                  private _mobileResizeService: MobileResizeService ) {
        this.isMobile = this._mobileResizeService.size$;

        this.VideoUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/pVE92TNDwUk?rel=0&modestbranding=1&autohide=1&showinfo=0');
        
        // Define call to action buttons
        this.LearnMoreName = 'Learn More';
        this.LearnMoreColor = '#44CDE7;';
        this.LearnMorePath = '/features';
    }

   /*  @ViewChild('') private iframeEmbededVideoTitle: ElementRef; */

    ngOnInit(): void {
        this.breakpoint = (window.innerWidth <= 960) ? 1 : 6;
    }

    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 960) ? 1 : 6;
    }

    removeTitle() {

    }
}
