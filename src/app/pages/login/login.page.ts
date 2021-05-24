import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styles: [
  ]
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  messageErr: string;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required]
    })
  }
  checkErrEmail() {
    if(this.formLogin.controls.email.hasError('required')) {
      return 'Email is required!'
    }
    return 'Email not match pattern'
  }
  onSubmit() {
    let data = this.formLogin.value;
    this.authService.login(data).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/admin')
      },
      err => {        
        this.messageErr = err;
      }
    );
  }
}
