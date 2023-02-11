import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  Object: any = Object;
  errorMessage!: string;
  userId!: string;
  constructor(private formBuilder: FormBuilder, public userService: UserService,public authService: AuthService) { }

  ngOnInit() {
    const user = this.authService.currentUser;
    this.userId = user.id;
    this.profileForm = this.formBuilder.group({
      username: [user.username, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      phone: [user.phone, [Validators.required, Validators.pattern('^[0-9]+$')]],
      country: [user.country, Validators.required]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.userId, this.profileForm.value)
        .subscribe(res => {
          alert('update profile success');
          this.authService.currentUser = res;
        },err => {
          console.log(err);
          this.errorMessage = err.error.message;
        });
    }
  }

}
