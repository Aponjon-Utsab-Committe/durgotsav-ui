import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  email: string = '';
  password: string = '';
  signinError: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signinError = "";
  }

  signin() {
    this.signinError = "";
    if (this.email && this.password) {
      this.authService
        .signin(this.email, this.password)
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
        })
        .catch((err) => {
          this.signinError = err.response.data.message || 'Something went wrong';
          console.error(err);
        });
    }
  }
}
