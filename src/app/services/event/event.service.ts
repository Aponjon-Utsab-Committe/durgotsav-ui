import { Injectable } from '@angular/core';

import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  createEvent(eventData: any) {
    return axios.post(`events`, eventData, {
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
  }

  getEvents(
    page: number = 1,
    pageSize: number = 10,
    status: string = 'ACTIVE'
  ) {
    return axios.get(`events`, {
      params: {
        page_no: page,
        page_size: pageSize,
        status,
      },
    });
  }

  getEvent(eventId: number) {
    return axios.get(`events/${eventId}`);
  }

  updateEvent(eventId: number, eventData: any) {
    return axios.put(`events/${eventId}`, eventData, {
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
  }

  getCoupons(eventId: number) {
    return axios.get(`events/${eventId}/coupons`, {
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
  }
}
