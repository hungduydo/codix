import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  countries = [
    { US: 'United States' },
    { UK: 'United Kingdom' },
    { FR: 'France' },
    { IT: 'Italy' },
    { VN: 'Viet Nam' },
  ];
  registerForm!: FormGroup;
  Object: any = Object;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(8)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(40)],
      ],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      country: ['', Validators.required],
    }, { validators: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls?.['password'].value;
    let confirmPass = group.controls?.['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }

  get f(): any {
    return this.registerForm.controls;
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get email() {
    return this.registerForm.get('email');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const {password, country,phone,email, username} = this.registerForm.value;
      this.authService.register({
        password, country,phone,email, username
      })
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('user', JSON.stringify(res));
          alert('Create account success');
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
        }
      );
    }
    console.log(this.registerForm.value);
  }
}
