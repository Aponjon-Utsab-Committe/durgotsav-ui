import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  userInfo: any;

  constructor(private router: Router) {}

  signin(email: string, password: string) {
    return axios.post(`/users/signin`, { email, password });
  }

  checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      // console.log('[1]');
      this.isLoggedIn = false;
    } else {
      const decoded = jwtDecode(token) as any;
      if (decoded && decoded.org_name == environment.orgName) {
        this.userInfo = { ...decoded };
        // console.log('[2]', decoded);
        this.isLoggedIn = false;
        const expAt = (decoded.exp || 0) * 1000;
        const epoch = Date.now();

        if(epoch >= expAt) {
          this.isLoggedIn = false;
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      } else {
        this.isLoggedIn = false;
      }
    }
  }
}
