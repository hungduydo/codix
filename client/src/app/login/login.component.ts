import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value)
        .subscribe(
          res => {
            console.log(res);
            localStorage.setItem('user', JSON.stringify(res));
            this.router.navigate(['/home']);
          },
          err => {
            console.log(err);
            this.errorMessage = err.error.message;
          }
        );
    }
  }
}
