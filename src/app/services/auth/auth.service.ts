import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  signin(email: string, password: string) {
    return axios.post(`/users/signin`, { email, password });
  }
}
