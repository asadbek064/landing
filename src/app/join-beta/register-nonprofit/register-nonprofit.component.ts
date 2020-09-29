import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { Nonprofit } from '../../shared/models/nonprofit.model'
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
  selector: 'app-register-nonprofit',
  templateUrl: './register-nonprofit.component.html',
  styleUrls: ['./register-nonprofit.component.scss']
})
export class RegisterNonprofitComponent implements OnInit {
  socialList: string[] = [
    'Nonprofit LinkedIn',
    'Nonprofit Twitter',
    'Nonprofit YouTube',
    'Nonprofit Instagram',
    'Nonprofit Facebook'
  ];

/*   title: Title[] = [
    {viewValue: 'title-1'},
    {viewValue: 'title-2'},
    {viewValue: 'title-3'},
    {viewValue: 'title-4'}
  ]; */

  stateList: State[] = [
      { value: 'AL', viewValue: 'Alabama (AL)'},
      { value: 'AK', viewValue: 'Alaska (AK)'},
      { value: 'AZ', viewValue: 'Arizona (AZ)'},
      { value: 'AR', viewValue: 'Arkansas (AR)'},
      { value: 'CA', viewValue: 'California (CA)'},
      { value: 'CO', viewValue: 'Colorado (CO)'},
      { value: 'CT', viewValue: 'Connecticut (CT)'},
      { value: 'DE', viewValue: 'Delaware (DE)'},
      { value: 'DC', viewValue: 'District Of Columbia (DC)'},
      { value: 'FL', viewValue: 'Florida (FL)'},
      { value: 'GA', viewValue: 'Georgia (GA)'},
      { value: 'HI', viewValue: 'Hawaii (HI)'},
      { value: 'ID', viewValue: 'Idaho (ID)'},
      { value: 'IL', viewValue: 'Illinois (IL)'},
      { value: 'IN', viewValue: 'Indiana (IN)'},
      { value: 'IA', viewValue: 'Iowa (IA)'},
      { value: 'KS', viewValue: 'Kansas (KS)'},
      { value: 'KY', viewValue: 'Kentucky (KY)'},
      { value: 'LA', viewValue: 'Louisiana (LA)'},
      { value: 'ME', viewValue: 'Maine (ME)'},
      { value: 'MD', viewValue: 'Maryland (MD)'},
      { value: 'MA', viewValue: 'Massachusetts (MA)'},
      { value: 'MI', viewValue: 'Michigan (MI)'},
      { value: 'MN', viewValue: 'Minnesota (MN)'},
      { value: 'MS', viewValue: 'Mississippi (MS)'},
      { value: 'MO', viewValue: 'Missouri (MO)'},
      { value: 'MT', viewValue: 'Montana (MT)'},
      { value: 'NE', viewValue: 'Nebraska (NE)'},
      { value: 'NV', viewValue: 'Nevada (NV)'},
      { value: 'NH', viewValue: 'New Hampshire (NH)'},
      { value: 'NJ', viewValue: 'New Jersey (NJ)'},
      { value: 'NM', viewValue: 'New Mexico (NM)'},
      { value: 'NY', viewValue: 'New York (NY)'},
      { value: 'NC', viewValue: 'North Carolina (NC)'},
      { value: 'ND', viewValue: 'North Dakota (ND)'},
      { value: 'OH', viewValue: 'Ohio (OH)'},
      { value: 'OK', viewValue: 'Oklahoma (OK)'},
      { value: 'OR', viewValue: 'Oregon (OR)'},
      { value: 'PA', viewValue: 'Pennsylvania (PA)'},
      { value: 'RI', viewValue: 'Rhode Island (RI)'},
      { value: 'SC', viewValue: 'South Carolina (SC)'},
      { value: 'SD', viewValue: 'South Dakota (SD)'},
      { value: 'TN', viewValue: 'Tennessee (TN)'},
      { value: 'TX', viewValue: 'Texas (TX)'},
      { value: 'UT', viewValue: 'Utah (UT)'},
      { value: 'VT', viewValue: 'Vermont (VY)'},
      { value: 'VA', viewValue: 'Virginia (VA)'},
      { value: 'WA', viewValue: 'Washington (WA)'},
      { value: 'WV', viewValue: 'West Virginia (WV)'},
      { value: 'WI', viewValue: 'Wisconsin (WI)'},
      { value: 'WY', viewValue: 'Wyoming (WY)'}

  ];

  industrieGroups: IndustrieGroup[]  = [
        {
          name: 'Nonprofit Type',
          industrie: [
            {value: 'Business Leagues: 501(C)(6)', viewValue: 'Business Leagues: 501(C)(6)'},
            {value: 'Charitable Organizations : 501(C)(3) ',       viewValue: 'Charitable Organizations : 501(C)(3) '},
            {value: 'Employee Benefit Associations or Funds: 501(C)(17)',  viewValue: 'Employee Benefit Associations or Funds: 501(C)(17)'},
            {value: 'Employee Benefit Associations or Funds: 501(C)(9)', viewValue: 'Employee Benefit Associations or Funds: 501(C)(9)'},
            {value: 'Fraternal Societies: 501(C)(10)', viewValue: 'Fraternal Societies: 501(C)(10)'},
            {value: 'Fraternal Societies: 501(C)(8)', viewValue: 'Fraternal Societies: 501(C)(8)'},
            {value: 'Labor and Agricultural Organizations: 501(C)(5)', viewValue: 'Labor and Agricultural Organizations: 501(C)(5)'},
            {value: 'Social Clubs: 501(C)(7)', viewValue: 'Social Clubs: 501(C)(7)'},
            {value: 'Social Welfare Organizations: 501(C)(4)', viewValue: 'Social Welfare Organizations: 501(C)(4)'},
            {value: 'Veterans Organizations: 501(C)(19)', viewValue: 'Veterans Organizations: 501(C)(19)'},
            {value: 'Other', viewValue: 'Other'}
          ]
        }
  ];
  // holds Logo file to be submitted
  public files: any[];

  // regex
  numericRegex = /^[a-zA-Z0-9]+$/;

  // external states status
  NonprofitReferredState: boolean;

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

    this.files = [];

    // form controls stepOne
    this.firstFormGroup = this.formBuilder.group({
      NonprofitName: ['', Validators.required],
      StreetAddress: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      ZipCode: ['', Validators.required],
      WebsiteUrl: [''],
      NonprofitType: ['', Validators.required],
    });

    // form controls stepTwo
    this.secondFormGroup = this.formBuilder.group({
      EIN: ['', Validators.required],

      socials:  [],
      SocialLinkedIn: [''],
      SocialTwitter: [''],
      SocialYoutube: [''],
      SocialInstagram: [''],
      SocialFacebook: [''],

      PhoneWork: ['', Validators.required ],
      RegistereePhone: [''],
      WorkEmail: ['', Validators.required],
      RegistereeLinkedIn: ['', Validators.required],
      Title: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],


    });

    // form controls stepThree
    this.thirdFormGroup = this.formBuilder.group({
      ReferralId: ['', Validators.required],
      eNewsletter: [],
      TermsAgree: ['', Validators.required]
    });

    // social selection updated
    this.secondFormGroup.controls.socials.valueChanges.subscribe( newSelection => {
      this.onChangeSocialSelection(newSelection);
    });

  }

  uploadFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.FinalformData = new FormData();
      this.FinalformData.append('file', file, file.name);
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

  setNonprofitReferredState(state) {
    this.NonprofitReferredState = state;
  }

  // update social inputs with new fields
  onChangeSocialSelection(newSelection) {
    const currentActive = [];

    // get active socials
    if (newSelection.includes('Nonprofit LinkedIn')) {  this.trigLinkedIn = true; currentActive.push('NonprofitLinkedIn'); }
    if (newSelection.includes('Nonprofit Twitter'))   {   this.trigTwitter = true; currentActive.push('Nonprofit Twitter'); }
    if (newSelection.includes('Nonprofit YouTube'))   {   this.trigYoutube = true; currentActive.push('Nonprofit YouTube'); }
    if (newSelection.includes('Nonprofit Instagram')) { this.trigInstagram = true; currentActive.push('Nonprofit Instagram'); }
    if (newSelection.includes('Nonprofit Facebook')) {  this.trigFacebook = true; currentActive.push('NonprofitFacebook'); }

    // hide ones that aren't selected
    if (!currentActive.includes('Nonprofit LinkedIn')) {    this.trigLinkedIn = false; }
    if (!currentActive.includes('Nonprofit Twitter'))   {   this.trigTwitter = false; }
    if (!currentActive.includes('Nonprofit YouTube'))   {   this.trigYoutube = false; }
    if (!currentActive.includes('Nonprofit Instagram')) {   this.trigInstagram = false; }
    if (!currentActive.includes('Nonprofit Facebook')) {    this.trigFacebook = false;  }
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

  openSnackBar() {
    this._snackBar.open('We will email you when the App has launched. You will not be able to login until then.', 'Thank you', {
      duration: 7000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

    this._router.navigate(['/home']);
  }

  openDialog() {
    const dialogRef = this.dialog.open( DialogContentEsignNonprofitDialog );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  submit() {
      // check signature status
    const SignatureAgreement = this.authService.AgreementSigned;

    // check all formGroups fields are filled
    if (!this.firstFormGroup.invalid &&
        !this .secondFormGroup.invalid &&
         this.thirdFormGroup.controls.TermsAgree &&
         SignatureAgreement
      ) {


      this.FinalformData.append('NonprofitName', DOMPurify.sanitize(this.firstFormGroup.controls.NonprofitName.value));
      this.FinalformData.append('StreetAddress', DOMPurify.sanitize(this.firstFormGroup.controls.StreetAddress.value));
      this.FinalformData.append('City', DOMPurify.sanitize(this.firstFormGroup.controls.City.value));
      this.FinalformData.append('State', DOMPurify.sanitize(this.firstFormGroup.controls.State.value));
      this.FinalformData.append('ZipCode', DOMPurify.sanitize(this.firstFormGroup.controls.ZipCode.value));
      this.FinalformData.append('WebsiteUrl', DOMPurify.sanitize(this.firstFormGroup.controls.WebsiteUrl.value));
      this.FinalformData.append('NonprofitType', DOMPurify.sanitize(this.firstFormGroup.controls.NonprofitType.value));
      this.FinalformData.append('NonprofitEIN', DOMPurify.sanitize(this.secondFormGroup.controls.EIN.value));
      this.FinalformData.append('NonprofitLinkedIn', DOMPurify.sanitize(this.secondFormGroup.controls.SocialLinkedIn.value));
      this.FinalformData.append('NonprofitTwitter', DOMPurify.sanitize(this.secondFormGroup.controls.SocialTwitter.value));
      this.FinalformData.append('NonprofitYoutube', DOMPurify.sanitize(this.secondFormGroup.controls.SocialYoutube.value));
      this.FinalformData.append('NonprofitInstagram', DOMPurify.sanitize(this.secondFormGroup.controls.SocialInstagram.value));
      this.FinalformData.append('NonprofitFacebook', DOMPurify.sanitize(this.secondFormGroup.controls.SocialFacebook.value));
      this.FinalformData.append('NonprofitPhone', DOMPurify.sanitize(this.secondFormGroup.controls.PhoneWork.value));
      this.FinalformData.append('RegistereePhone', DOMPurify.sanitize(this.secondFormGroup.controls.RegistereePhone.value));
      this.FinalformData.append('NonprofitEmail', DOMPurify.sanitize(this.secondFormGroup.controls.WorkEmail.value));
      this.FinalformData.append('RegistereeLinkedIn', DOMPurify.sanitize(this.secondFormGroup.controls.RegistereeLinkedIn.value));
      this.FinalformData.append('RegistereeTitle', DOMPurify.sanitize(this.secondFormGroup.controls.Title.value));
      this.FinalformData.append('RegistereeName', DOMPurify.sanitize(this.secondFormGroup.controls.FirstName.value) + ' '+ DOMPurify.sanitize(this.secondFormGroup.controls.LastName.value));
      this.FinalformData.append('eNewsletter', DOMPurify.sanitize(this.thirdFormGroup.controls.eNewsletter.value));
      this.FinalformData.append('TermsAgree', DOMPurify.sanitize(this.thirdFormGroup.controls.TermsAgree.value) );
      this.FinalformData.append('Signature', this.authService.signatureImg);


      this.authService.registerNonprofit(this.FinalformData).subscribe(
        res => {

            if (res.success) {

            // reset the formData and formGroup
            this.FinalformData = new FormData();
            this.FinalformData = new FormData();


            this.message = true;
            this.sendMessage();


            this.openSnackBar();
          } else if (!res.success) {
            console.log('Nonprofit Register Form was not accepeted something went wrong');
          }
        }
      );
    } else {
      return;
    }
  }

  ngOnInit(): void {
  }

}





@Component({
  selector: 'dialog-content-esign',
  templateUrl: 'dialog-content-esign-nonprofit.html',
  styleUrls: ['dialog-content-esign-nonprofit.scss']

})
export class DialogContentEsignNonprofitDialog implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  Date: string;
  Name: string;
  Title: string;
  BusinessName: string;
  Signature: any;

  constructor( private _authService: AuthService){

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
  onMouseUp(e) {
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
    this.img = this.sigPadElement.toDataURL("image/png", .5);
    // convert base64 to blob to later on on submit append to form data on service
    this.img = this.dataURItoBlob(this.img);
  }



  Agree() {
    this.save();
    this._authService.signatureImg = this.img;
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
