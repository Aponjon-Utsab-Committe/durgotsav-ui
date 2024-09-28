import { Injectable } from '@angular/core';

import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  getEvents(status = 'ACTIVE') {
    return axios.get(`events`, {
      params: {
        status,
      },
    });
  }

  updateEvent(eventId: number, eventData: any) {
    return axios.put(`events/${eventId}`, eventData, {
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
  }
}
