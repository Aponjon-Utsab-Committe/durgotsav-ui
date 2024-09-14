import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  getEvents() {
    return axios.get('http://localhost:3000/api/events');
  }
}
