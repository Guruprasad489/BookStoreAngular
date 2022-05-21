import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/UserServices/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;

  signUpForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService : UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern("(?=^.{0,40}$)^[a-zA-Z]{3,}\\s?[a-zA-Z]*$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9]{3,}([._+-][a-zA-Z0-9]{1,})?@[a-zA-Z0-9]{1,10}[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3})?$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&%$#@?^*!~]).{8,}$")]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^[1-9][0-9]{9}$")]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.valid) {
      let reqData = {
        fullName: this.signUpForm.value.fullName,
        emailId: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        mobileNumber: this.signUpForm.value.mobileNumber
      }
      
      this.userService.registration(reqData).subscribe((response:any)=>{
          console.log("Register successful", response);
          this._snackBar.open('User registered successfully', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              panelClass: ['snackbar-green']
          })
      });

    }
  }

  onReset() {
    this.submitted = false;
    this.signUpForm.reset();
  }
}
