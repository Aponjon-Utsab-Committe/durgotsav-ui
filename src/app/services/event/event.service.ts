import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  getEvents() {
    return axios.get(`events`);
  }
}
