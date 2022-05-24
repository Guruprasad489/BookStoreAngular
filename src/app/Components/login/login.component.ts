import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/AdminServices/admin.service';
import { UserService } from 'src/app/Services/UserServices/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService : UserService, private admin : AdminService,
    private _snackBar: MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9]{3,}([._+-][a-zA-Z0-9]{1,})?@[a-zA-Z0-9]{1,10}[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3})?$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&%$#@?^*!~]).{8,}$")]],
    });
  }

  onSubmit(){
    
    if (this.loginForm.valid) {
      let reqData = {
        emailId: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }

      if(this.loginForm.value.email != 'admin@bookstore.com'){
        this.userService.login(reqData).subscribe((response:any)=>{
            console.log("Login successful", response);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("name",response.data.fullName);
            localStorage.setItem("email",response.data.emailId);
            localStorage.setItem("userId",response.data.userId);
            this.router.navigateByUrl('/home/books');

            this._snackBar.open('Logged in successfully', '', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-green']
            })
        });
      }
      else{
        this.admin.adminLogin(reqData).subscribe((response:any)=>{
          console.log("Admin Login successful", response);
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("name",response.data.fullName);
          localStorage.setItem("email",response.data.emailId);
          this.router.navigateByUrl('/home/books');

          this._snackBar.open('Admin Logged in successfully', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              panelClass: ['snackbar-green']
          })
      });
      }
    }
  }
}
