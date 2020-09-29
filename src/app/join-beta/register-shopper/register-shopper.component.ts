import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import DOMPurify from 'dompurify';
import { EmailValidator } from './customValidators';
import { MatStepper } from '@angular/material/stepper';
import { ValidateEmailService } from '../../shared/services/validateEmail.service';
import { Shopper } from '../../shared/models/shopper.model';
import { AuthService } from '../../shared/services/auth.service';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';
import { SearchService } from '../../shared/services/search.service';


@Component({
  selector: 'app-register-shopper',
  templateUrl: './register-shopper.component.html',
  styleUrls: ['./register-shopper.component.scss']
})
export class RegisterShopperComponent {

 // variables to hold values from signup form
 firstName: string;
 lastName: string;
 emailAddress: string;
 emailConfirm: string;
 zipcode: number;
 designatedNonprofit: string ;
 termsAgreeBox: boolean;

 // formgroup set up
 firstFormGroup: FormGroup;
 secoundFormGroup: FormGroup;

 // main stepper id to control
 @ViewChild('stepper') stepper: MatStepper;

 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition =    'bottom';
 // custom validators and checkers for all the needed inputs for signup page
 constructor(
     private formBuilder: FormBuilder,
     private _snackBar: MatSnackBar,
     private router: Router,
     private validateEmailService: ValidateEmailService,
     private apiService: AuthService,
     readonly searchServices: SearchService
 ) {
     this.firstFormGroup = this.formBuilder.group({
         firstName: ['', Validators.required],
         lastName: ['', Validators.required],
         email: ['', Validators.required],
         emailConfirm: ['',
                             [ Validators.required,
                               Validators.email,
                               EmailValidator('email'),
                               Validators.maxLength(50) ]
                       ],
     });

     this.secoundFormGroup = this.formBuilder.group({
         designated_NonProfit: [''],
         zipcode: ['', Validators.required],
         eNewsletter: [''],
         termsAgreeBox: ['', Validators.required]
     });

 }

 goBack() {
     this.router.navigate(['/home']);
 }

 goStepTwo() {
     if (!this.firstFormGroup.invalid) {
         // check if email not taken
         this.validateEmailService.isEmailAvailable(String(this.firstFormGroup.controls.email.value))
             .subscribe( result => {
                 if (result.success) {
                     this.stepper.next();
                 } else { // email already used
                     this.firstFormGroup.controls.email.setErrors({error: 'Email Already Used'});
                 }
             }
             );
         }
 }

 openSnackBar() {
    this._snackBar.open('We will email you when the App has launched. You will not be able to login until then.', 'Thank you', {
      duration: 7000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

    //this.router.navigate(['/home']);
  }


  selectedChoice(Inputvalue) {
   this.secoundFormGroup.controls.designated_NonProfit.setValue(Inputvalue);
}

 // signup function that checks and extracts info and get its ready for db
 onSubmit() {

     // before submiting make sure there is no validators error
     if (!this.secoundFormGroup.invalid &&
         !this.firstFormGroup.invalid &&
         this.secoundFormGroup.controls.termsAgreeBox.value ) {
         this.addShopper();
     }

 }


 addShopper() {
     const newShopper: Shopper = ({
         firstName : DOMPurify.sanitize(String(this.firstFormGroup.controls.firstName.value)),
         lastName : DOMPurify.sanitize(String(this.firstFormGroup.controls.lastName.value)),
         email : DOMPurify.sanitize(String(this.firstFormGroup.controls.email.value)),
         designated_NonProfit : DOMPurify.sanitize(String(this.secoundFormGroup.controls.designated_NonProfit.value)),
         zipcode : DOMPurify.sanitize(String(this.secoundFormGroup.controls.zipcode.value)),
         eNewsletter: this.secoundFormGroup.controls.eNewsletter.value
     });

     this.apiService.registerShopper(newShopper).subscribe(
         result =>  {
             if (result.sucess) {
                 // reset the signup stepper
                 this.stepper.reset();
                 // redirect to login
                 this.openSnackBar();
             }
         }, err => {
             console.log(err);
         }
     );
     this.goBack();
 }

}
