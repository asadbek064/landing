import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatStepper } from '@angular/material/stepper';
import DOMPurify from 'dompurify';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MobileResizeService } from '../../shared/services/mobile-resize.service';
import { Observable } from 'rxjs';

export interface Industrie {
  value: string;
  viewValue: string;
}

export interface IndustrieGroup {
  disabled?: boolean;
  name: string;
  industrie: Industrie[];
}

export interface State {
  value: string;
  viewValue: string;
}

export interface Title {
  viewValue: string;
}

export interface Social {
  viewValue: string;
  value?: string;
}

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.scss']
})
export class RegisterBusinessComponent {

  socialList: string[] = [
    'Business LinkedIn',
    'Business Twitter',
    'Business YouTube',
    'Business Instagram',
    'Business Facebook'
  ];

 /*  title: Title[] = [
    { viewValue: 'title-1' },
    { viewValue: 'title-2' },
    { viewValue: 'title-3' },
    { viewValue: 'title-4' }
  ]; */

  stateList: State[] = [
    { value: 'AL', viewValue: 'Alabama (AL)' },
    { value: 'AK', viewValue: 'Alaska (AK)' },
    { value: 'AZ', viewValue: 'Arizona (AZ)' },
    { value: 'AR', viewValue: 'Arkansas (AR)' },
    { value: 'CA', viewValue: 'California (CA)' },
    { value: 'CO', viewValue: 'Colorado (CO)' },
    { value: 'CT', viewValue: 'Connecticut (CT)' },
    { value: 'DE', viewValue: 'Delaware (DE)' },
    { value: 'DC', viewValue: 'District Of Columbia (DC)' },
    { value: 'FL', viewValue: 'Florida (FL)' },
    { value: 'GA', viewValue: 'Georgia (GA)' },
    { value: 'HI', viewValue: 'Hawaii (HI)' },
    { value: 'ID', viewValue: 'Idaho (ID)' },
    { value: 'IL', viewValue: 'Illinois (IL)' },
    { value: 'IN', viewValue: 'Indiana (IN)' },
    { value: 'IA', viewValue: 'Iowa (IA)' },
    { value: 'KS', viewValue: 'Kansas (KS)' },
    { value: 'KY', viewValue: 'Kentucky (KY)' },
    { value: 'LA', viewValue: 'Louisiana (LA)' },
    { value: 'ME', viewValue: 'Maine (ME)' },
    { value: 'MD', viewValue: 'Maryland (MD)' },
    { value: 'MA', viewValue: 'Massachusetts (MA)' },
    { value: 'MI', viewValue: 'Michigan (MI)' },
    { value: 'MN', viewValue: 'Minnesota (MN)' },
    { value: 'MS', viewValue: 'Mississippi (MS)' },
    { value: 'MO', viewValue: 'Missouri (MO)' },
    { value: 'MT', viewValue: 'Montana (MT)' },
    { value: 'NE', viewValue: 'Nebraska (NE)' },
    { value: 'NV', viewValue: 'Nevada (NV)' },
    { value: 'NH', viewValue: 'New Hampshire (NH)' },
    { value: 'NJ', viewValue: 'New Jersey (NJ)' },
    { value: 'NM', viewValue: 'New Mexico (NM)' },
    { value: 'NY', viewValue: 'New York (NY)' },
    { value: 'NC', viewValue: 'North Carolina (NC)' },
    { value: 'ND', viewValue: 'North Dakota (ND)' },
    { value: 'OH', viewValue: 'Ohio (OH)' },
    { value: 'OK', viewValue: 'Oklahoma (OK)' },
    { value: 'OR', viewValue: 'Oregon (OR)' },
    { value: 'PA', viewValue: 'Pennsylvania (PA)' },
    { value: 'RI', viewValue: 'Rhode Island (RI)' },
    { value: 'SC', viewValue: 'South Carolina (SC)' },
    { value: 'SD', viewValue: 'South Dakota (SD)' },
    { value: 'TN', viewValue: 'Tennessee (TN)' },
    { value: 'TX', viewValue: 'Texas (TX)' },
    { value: 'UT', viewValue: 'Utah (UT)' },
    { value: 'VT', viewValue: 'Vermont (VY)' },
    { value: 'VA', viewValue: 'Virginia (VA)' },
    { value: 'WA', viewValue: 'Washington (WA)' },
    { value: 'WV', viewValue: 'West Virginia (WV)' },
    { value: 'WI', viewValue: 'Wisconsin (WI)' },
    { value: 'WY', viewValue: 'Wyoming (WY)' }

  ];

  industrieGroups: IndustrieGroup[] = [
    {
      name: 'Bars and Restaurants',
      industrie: [
        { value: 'Bars and Restaurants', viewValue: 'Bars and Restaurants' },
      ]
    },
    {
      name: 'Business Services',
      industrie: [
        { value: 'Accounting', viewValue: 'Accounting' },
        { value: 'Art ', viewValue: 'Art ' },
        { value: 'Cleaning', viewValue: 'Cleaning' },
        { value: 'Computer and Cell Phone Repair Shops', viewValue: 'Computer and Cell Phone Repair Shops' },
        { value: 'Contractors', viewValue: 'Contractors' },
        { value: 'Electrical', viewValue: 'Electrical' },
        { value: 'Financial Services', viewValue: 'Financial Services' },
        { value: 'Flooring', viewValue: 'Flooring' },
        { value: 'Florist', viewValue: 'Florist' },
        { value: 'Human Resources', viewValue: 'Human Resources' },
        { value: 'HVAC', viewValue: 'HVAC' },
        { value: 'Insurance', viewValue: 'Insurance' },
        { value: 'Interior Design', viewValue: 'Interior Design' },
        { value: 'Landscaping', viewValue: 'Landscaping' },
        { value: 'Legal', viewValue: 'Legal' },
        { value: 'Martial Arts', viewValue: 'Martial Arts' },
        { value: 'Movers', viewValue: 'Movers' },
        { value: 'Notary', viewValue: 'Notary' },
        { value: 'Office Supplies', viewValue: 'Office Supplies' },
        { value: 'Painting', viewValue: 'Painting' },
        { value: 'Plumbing', viewValue: 'Plumbing' },
        { value: 'Photography', viewValue: 'Photography' },
        { value: 'Real Estate', viewValue: 'Real Estate' },
        { value: 'Roofing', viewValue: 'Roofing' },
        { value: 'Social Media', viewValue: 'Social Media' },
        { value: 'Sales and Marketing', viewValue: 'Sales and Marketing' },
        { value: 'Storage', viewValue: 'Storage' }
      ]
    },
    {
      name: 'Entertainment',
      industrie: [
        { value: 'Concerts', viewValue: 'Concerts' },
        { value: 'Dance', viewValue: 'Dance' },
        { value: 'Movie Theaters', viewValue: 'Movie Theaters' },
        { value: 'Museums', viewValue: 'Museums' },
        { value: 'Sport Events', viewValue: 'Sport Events' },
        { value: 'Theaters', viewValue: 'Theaters' }
      ]
    },
    {
      name: 'Beauty and Wellness',
      industrie: [
        { value: 'Barber Shops', viewValue: 'Barber Shops' },
        { value: 'Chiropractic', viewValue: 'Chiropractic' },
        { value: 'Dental', viewValue: 'Dental' },
        { value: 'Gyms', viewValue: 'Gyms' },
        { value: 'Hair Salons', viewValue: 'Hair Salons' },
        { value: 'Massage', viewValue: 'Massage' },
        { value: 'Medical', viewValue: 'Medical' },
        { value: 'Nails', viewValue: 'Nails' },
        { value: 'Optics', viewValue: 'Optics' },
        { value: 'Personal Training', viewValue: 'Personal Training' },
        { value: 'Physical Therapy', viewValue: 'Physical Therapy' },
        { value: 'Spa', viewValue: 'Spa' },
        { value: 'Tanning', viewValue: 'Tanning' }
      ]
    },
    {
      name: 'Retail',
      industrie: [
        { value: 'Appliances', viewValue: 'Appliances' },
        { value: 'Books', viewValue: 'Books' },
        { value: 'Children\'s Toys', viewValue: 'Children\'s Toys' },
        { value: 'Clothes & Shoes', viewValue: 'Clothes & Shoes' },
        { value: 'Cosmetics', viewValue: 'Cosmetics' },
        { value: 'Dry Cleaning', viewValue: 'Dry Cleaning' },
        { value: 'Electronics', viewValue: 'Electronics' },
        { value: 'Food & Groceries', viewValue: 'Food & Groceries' },
        { value: 'Furniture', viewValue: 'Furniture' },
        { value: 'Florists', viewValue: 'Florists' },
        { value: 'Gift Stores', viewValue: 'Gift Stores' },
        { value: 'Jewelry', viewValue: 'Jewelry' },
        { value: 'Pet Supplies', viewValue: 'Pet Supplies' },
        { value: 'Sports Equipment', viewValue: 'Sports Equipment' },
      ]
    },
    {
      name: 'Travel',
      industrie: [
        { value: 'Airlines', viewValue: 'Airlines' },
        { value: 'Hotels', viewValue: 'Hotels' },
        { value: 'Travel Services', viewValue: 'Travel Services' }
      ]
    },

  ];


  // regex
  numericRegex = /^[a-zA-Z0-9]+$/;

  // external states status
  BusinessReferredState: boolean;
  selectedSocial: string;
  // social trigger variables
  trigLinkedIn: boolean;
  trigTwitter: boolean;
  trigYoutube: boolean;
  trigInstagram: boolean;
  trigFacebook: boolean;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  FinalformData: FormData;

  // main stepper id to control
  @ViewChild('stepper') stepper: MatStepper;

  // file upload
  @ViewChild('fileInput') fileInput: ElementRef;
  imageUrl: any;
  editFile = true;
  removeUpload = false;

  message = false;
  @Output() messageEvent = new EventEmitter<boolean>();

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private _router: Router
  ) {

    // form controls stepOne
    this.firstFormGroup = this.formBuilder.group({
      BusinessName: ['', Validators.required],
      StreetAddress: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      ZipCode: ['', Validators.required],
      WebsiteUrl: [''],
      BusinessType: ['', Validators.required],
    });

    // form controls stepTwo
    this.secondFormGroup = this.formBuilder.group({
      EIN: ['', Validators.required],

      socials: [],
      SocialLinkedIn: [''],
      SocialTwitter: [''],
      SocialYoutube: [''],
      SocialInstagram: [''],
      SocialFacebook: [''],

      PhoneWork: ['', Validators.required],
      RegistereePhone: [''],
      WorkEmail: ['', Validators.required],
      RegistereeLinkedIn: ['', Validators.required],
      Title: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],

    });

    // form controls stepThree
    this.thirdFormGroup = this.formBuilder.group({
      designated_NonProfit: [''],
      eNewsletter: [''],
      TermsAgree: ['', Validators.required],
      /* reCAPTCHA: ['', Validators.required], */
    });

    // social selection updated
    this.secondFormGroup.controls.socials.valueChanges.subscribe(newSelection => {
      this.onChangeSocialSelection(newSelection);
    });

  }

  uploadFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.FinalformData = new FormData();
      this.FinalformData.append('logo', file, file.name);
    }
  }

  // remove uploaded file
  clearFile() {
    this.thirdFormGroup.get('file').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  sendMessage() {
    this.messageEvent.emit(this.message);
  }


  setBusinesReferredState(state) {
    this.BusinessReferredState = state;
  }

  // update social inputs with new fields
  onChangeSocialSelection(newSelection) {
    const currentActive = [];

    // get active socials
    if (newSelection.includes('Business LinkedIn')) { this.trigLinkedIn = true; currentActive.push('Business LinkedIn'); }
    if (newSelection.includes('Business Twitter')) { this.trigTwitter = true; currentActive.push('Business Twitter'); }
    if (newSelection.includes('Business YouTube')) { this.trigYoutube = true; currentActive.push('Business YouTube'); }
    if (newSelection.includes('Business Instagram')) { this.trigInstagram = true; currentActive.push('Business Instagram'); }
    if (newSelection.includes('Business Facebook')) { this.trigFacebook = true; currentActive.push('Business Facebook'); }

    // hide ones that aren't selected
    if (!currentActive.includes('Business LinkedIn')) { this.trigLinkedIn = false; }
    if (!currentActive.includes('Business Twitter')) { this.trigTwitter = false; }
    if (!currentActive.includes('Business YouTube')) { this.trigYoutube = false; }
    if (!currentActive.includes('Business Instagram')) { this.trigInstagram = false; }
    if (!currentActive.includes('Business Facebook')) { this.trigFacebook = false; }
  }

  /* move to next step from stepOne only after
  requierd fields  are filled */
  nextFromStepOne() {
    if (!this.firstFormGroup.invalid) {
      this.stepper.next();
    }
  }
  /* move to next step from stepTwo only after
 requierd fields  are filled */
  nextFromStepTwo() {
    if (!this.secondFormGroup.invalid) {
      this.stepper.next();
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
  }

  openSnackBar() {
    this._snackBar.open('We will email you when the App has launched. You will not be able to login until then.', 'Thank you', {
      duration: 7000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

    this._router.navigate(['/home']);
  }

  openDialog() {
    const dialogRef = this.dialog.open( DialogContentEsignBusinessDialog );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  submit() {
    // check signature status
    const SignatureAgreement = this.authService.AgreementSigned;

    // check all formGroups fields are filled
    if (!this.firstFormGroup.invalid &&
      !this.secondFormGroup.invalid &&
      this.thirdFormGroup.controls.TermsAgree &&
      SignatureAgreement
    ) {

      this.FinalformData.append('BusinessName', DOMPurify.sanitize(this.firstFormGroup.controls.BusinessName.value));
      this.FinalformData.append('StreetAddress', DOMPurify.sanitize(this.firstFormGroup.controls.StreetAddress.value));
      this.FinalformData.append('City', DOMPurify.sanitize(this.firstFormGroup.controls.City.value));
      this.FinalformData.append('State', DOMPurify.sanitize(this.firstFormGroup.controls.State.value));
      this.FinalformData.append('ZipCode', DOMPurify.sanitize(this.firstFormGroup.controls.ZipCode.value));
      this.FinalformData.append('WebsiteUrl', DOMPurify.sanitize(this.firstFormGroup.controls.WebsiteUrl.value));
      this.FinalformData.append('BusinessType', DOMPurify.sanitize(this.firstFormGroup.controls.BusinessType.value));
      this.FinalformData.append('BusinessEIN', DOMPurify.sanitize(this.secondFormGroup.controls.EIN.value));
      this.FinalformData.append('BusinessLinkedIn', DOMPurify.sanitize(this.secondFormGroup.controls.SocialLinkedIn.value));
      this.FinalformData.append('BusinessTwitter', DOMPurify.sanitize(this.secondFormGroup.controls.SocialTwitter.value));
      this.FinalformData.append('BusinessYoutube', DOMPurify.sanitize(this.secondFormGroup.controls.SocialYoutube.value));
      this.FinalformData.append('BusinessInstagram', DOMPurify.sanitize(this.secondFormGroup.controls.SocialInstagram.value));
      this.FinalformData.append('BusinessFacebook', DOMPurify.sanitize(this.secondFormGroup.controls.SocialFacebook.value));
      this.FinalformData.append('BusinessPhone', DOMPurify.sanitize(this.secondFormGroup.controls.PhoneWork.value));
      this.FinalformData.append('RegistereePhone', DOMPurify.sanitize(this.secondFormGroup.controls.RegistereePhone.value));
      this.FinalformData.append('BusinessEmail', DOMPurify.sanitize(this.secondFormGroup.controls.WorkEmail.value));
      this.FinalformData.append('RegistereeLinkedIn', DOMPurify.sanitize(this.secondFormGroup.controls.RegistereeLinkedIn.value));
      this.FinalformData.append('RegistereeTitle', DOMPurify.sanitize(this.secondFormGroup.controls.Title.value));
      this.FinalformData.append('RegistereeName', DOMPurify.sanitize(this.secondFormGroup.controls.FirstName.value) + ' '+ DOMPurify.sanitize(this.secondFormGroup.controls.LastName.value));
      this.FinalformData.append('designated_NonProfit', DOMPurify.sanitize(this.thirdFormGroup.controls.designated_NonProfit.value));
      this.FinalformData.append('eNewsletter', DOMPurify.sanitize(this.thirdFormGroup.controls.eNewsletter.value));
      this.FinalformData.append('TermsAgree', DOMPurify.sanitize(this.thirdFormGroup.controls.TermsAgree.value) );
      this.FinalformData.append('Signature', this.authService.signatureImg);

      this.authService.registerBusiness(this.FinalformData).subscribe(
        res => {
          if (res.success) {

            // reset form data
            this.FinalformData = new FormData();

            this.message = true;
            this.sendMessage();

            this.openSnackBar();
          } else if (!res.success) {
            console.log('Business Register Form was not accepeted something went wrong');
          }
        }
      );
    } else {
      return;
    }
  }

}


@Component({
  selector: 'dialog-content-esign',
  templateUrl: 'dialog-content-esign.html',
  styleUrls: ['dialog-content-esign.scss']

})
export class DialogContentEsignBusinessDialog implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  Date: string;
  Name: string;
  Title: string;
  BusinessName: string;
  Signature: any;
  isMobile: Observable<boolean>;

  constructor( private _authService: AuthService,
               private _mobileResizeService: MobileResizeService){
                this.isMobile = this._mobileResizeService.size$;
  }

  @ViewChild('sigPad') sigPad;
  sigPadElement;
  context;
  isDrawing = false;
  img;

  ngAfterViewInit() {
    this.sigPadElement = this.sigPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');
    this.context.strokeStyle = '#58585A';
  }

  @Input() name: string;

  @HostListener('document:mouseup', ['$event'])

  onMouseUp() {
    this.isDrawing = false;
  }

  onMouseDown(e) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  onTouchEnd() {
      this.isDrawing = false;
  }

  onTouchDown(e) {
    e.preventDefault();
    this.isDrawing = true;
    const event = {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
        target: e.touches[0].target
    }
    const coords = this.relativeCoords(event);
    this.context.moveTo(coords.x, coords.y);
  }

  onTouchMove(e) {
    e.preventDefault();
    
    const event = {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
        target: e.touches[0].target
    }

    if (this.isDrawing) {
        const coords = this.relativeCoords(event);
        this.context.lineTo(coords.x, coords.y);
        this.context.stroke();
      }
  }

  private relativeCoords(event) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return { x: x, y: y };
  }

  clear() {
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }


  save() {
    this.img = this.sigPadElement.toDataURL("image/png", 1.0);
    // convert base64 to blob to later on on submit append to form data on service
    this.img = this.dataURItoBlob(this.img);
    this._authService.signatureImg = this.img;

  }


  Agree() {
    this.save();
    this._authService.AgreementSigned = true;
  }


   dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}

}
