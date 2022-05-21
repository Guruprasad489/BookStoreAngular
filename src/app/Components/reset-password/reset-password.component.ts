import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/UserServices/user.service';
import { MustMatch } from '..';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  token: any;

  resetPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router, private userService : UserService, private _snackBar: MatSnackBar,
     private activeRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&%$#@?^*!~]).{8,}$")]],
      confirmPassword: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&%$#@?^*!~]).{8,}$")]]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    }
    );
    this.token = this.activeRoute.snapshot.paramMap.get('token');
  }

  onSubmit(){
    
    if (this.resetPasswordForm.valid) {
      let reqData = {
        password: this.resetPasswordForm.value.password,
        confirmPassword: this.resetPasswordForm.value.confirmPassword
      }
      this.userService.resetPassword(reqData, this.token).subscribe((response: any) => {
        console.log("Password changed successfully", response);
        this.router.navigateByUrl('/login')

        this._snackBar.open('Congratulations! Password changed successfully', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['snackbar-green']
        })
      });
    }
  }

}
