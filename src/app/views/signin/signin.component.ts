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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signin() {
    if (this.email && this.password) {
      this.authService
        .signin(this.email, this.password)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {});
    }
  }
}
