import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import DOMPurify from 'dompurify';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';
import { MobileResizeService } from '../../shared/services/mobile-resize.service';
import { AuthService } from '../../shared/services/auth.service';
import { ContactUs } from '../../shared/models/contactus.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit{
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    ContactUsFormGroup: FormGroup;
    ContactUsForm: ContactUs;
    @ViewChild('mep') mep;

    constructor(
        private _snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private _mobileResizeService: MobileResizeService,
        private _authService: AuthService,
    ) {
        // if contact us section selected from nav triger open acordian
        _mobileResizeService.componentMethodCalled$
            .subscribe(
                (sectionID) => {
                    if (sectionID === '#ContactUsSection') {
                        this.mep.expanded = true;
                    }
                }
            )
        this.ContactUsFormGroup = this.formBuilder.group({
            Name: ['',Validators.required],
            Email: ['',
                        [ Validators.required,
                          Validators.email,
                          Validators.maxLength(50)]
                    ],
            Message: ['',Validators.required],
            AdditionalDetails: ['', Validators.required]
        })
    }

    ngOnInit(){
        this.ContactUsFormGroup.reset();
    }


    Submit() {
        if (!this.ContactUsFormGroup.invalid) {

            this.ContactUsForm  = {
                name: DOMPurify.sanitize(this.ContactUsFormGroup.controls.Name.value),
                email: DOMPurify.sanitize(this.ContactUsFormGroup.controls.Email.value),
                message: DOMPurify.sanitize(this.ContactUsFormGroup.controls.Message.value),
                content: DOMPurify.sanitize(this.ContactUsFormGroup.controls.AdditionalDetails.value)
            }
            // send formdata
            this._authService.sendMail(this.ContactUsForm).subscribe(
                res => {
                    if (res.success) {
                        this.mep.expanded = false;
                        this.openSnackBarSuccess();
                        this.ContactUsFormGroup.reset();
                    } else {
                        this.mep.expanded = false;
                        this.openSnackBarFaild();
                        this.ContactUsFormGroup.reset();
                    }
                },

                error => {
                        console.log(error)  ;
                    this.mep.expanded = false;
                        this.openSnackBarFaild();
                        this.ContactUsFormGroup.reset();
                }
            )
        }
    }

    openSnackBarSuccess() {
        this._snackBar.open('Message Sent', 'Thank you', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }

      openSnackBarFaild() {
        this._snackBar.open("Message Couldn't be Sent", 'Sorry for Inconvenience', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }

}
