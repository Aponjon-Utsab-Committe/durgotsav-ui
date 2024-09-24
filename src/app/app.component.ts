import { Component, OnDestroy, OnInit } from '@angular/core';
import { jwtDecode } from "jwt-decode";

import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'current-directory';
  poll: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkToken();
    this.poll = setInterval(() => {
      console.log('Check login status');
      this.authService.checkToken();
    }, 300000);
  }

  ngOnDestroy(): void {
    if (this.poll) {
      clearInterval(this.poll);
    }
  }
}
