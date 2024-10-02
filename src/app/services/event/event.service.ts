import { Injectable } from '@angular/core';

import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  createEvent(eventData: any) {
    return axios.post(
      `events`,
      eventData,
      { headers: { 'x-access-token': localStorage.getItem('token') } }
    );
  }

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
