import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '..';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hide1 = true;
  hide2 = true;

  resetPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&%$#@?^*!~]).{8,}$")]],
      confirmPassword: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&%$#@?^*!~]).{8,}$")]]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    }
    );
  }

  onSubmit(){
    
    this.router.navigateByUrl('/login')
  }

}
