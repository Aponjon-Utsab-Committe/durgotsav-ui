import { Component, OnDestroy, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  poll: any;
  isLoggedIn: boolean = false;
  loggedInUser: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkToken();
    this.isLoggedIn = this.authService.isLoggedIn;
    this.loggedInUser = this.authService.userInfo;
    // console.log(this.isLoggedIn, this.loggedInUser);
    this.poll = setInterval(() => {
      // console.log('Check login status');
      this.authService.checkToken();
      this.isLoggedIn = this.authService.isLoggedIn;
      this.loggedInUser = this.authService.userInfo;
    }, 1000);
  }

  signout() {
    this.authService.signout();
  }

  ngOnDestroy(): void {
    if (this.poll) {
      clearInterval(this.poll);
    }
  }

}
