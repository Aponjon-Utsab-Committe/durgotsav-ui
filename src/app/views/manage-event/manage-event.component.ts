import { Component, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css'],
})
export class ManageEventComponent implements OnInit {
  onlyActive: boolean = true;
  router: Router;
  events: Array<any> = new Array();
  total: number = 0;
  selectedEvent: any;

  role: string = '';
  page: number = 1;
  pageSize: number = 10;

  name!: string;
  venue!: string;
  from!: Date;
  to!: Date;

  @ViewChild('saveEvent') saveForm!: Form;

  busy: boolean = false;
  message: string = '';
  type: 'SUCCESS' | 'ERROR' | 'INFO' | '' = '';

  constructor(private eventService: EventService, authService: AuthService, _router: Router) {
    this.router = _router;
    this.role = authService.userInfo?.role;
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(append: boolean = false) {
    this.page = append ? this.page + 1 : 1;
    this.eventService
      .getEvents(this.page, this.pageSize, this.onlyActive ? 'ACTIVE' : '')
      .then(({ data }) => {
        if (append) {
          this.events = this.events.concat(data.list);
        } else {
          this.events = data.list;
        }
        this.total = data.total;
      });
  }

  deleteEvent() {
    this.message = '';
    this.type = '';
    this.busy = true;

    this.eventService
      .updateEvent(this.selectedEvent.id, {
        status: 'CANCELLED',
      })
      .then(() => {
        this.message = 'Event deleted';
        this.type = 'SUCCESS';
        this.busy = false;
        setTimeout(() => {
          $('#deleteConfirmation').hide();
          $('.modal-backdrop').remove();
          this.message = '';
          this.type = '';
        }, 2000);
        this.getEvents();
      })
      .catch((err) => {
        console.error(err.response.data.message);
        this.message = err.response.data.message || 'Something went wrong';
        this.type = 'ERROR';
      })
      .finally(() => {
        this.busy = false;
      });
  }

  onSaveEvent() {
    this.message = '';
    if (this.from > this.to) {
      this.message = 'From date cannot be greater than To date';
      this.type = 'ERROR';
      return;
    }
    this.busy = true;

    if (this.selectedEvent) {
      this.eventService
        .updateEvent(this.selectedEvent.id, {
          name: this.name,
          venue: this.venue,
          from: this.from,
          to: this.to,
        })
        .then(() => {
          this.message = 'Event updated';
          this.type = 'SUCCESS';
          this.busy = false;
          setTimeout(() => {
            $('#saveEvent').hide();
            $('.modal-backdrop').remove();
            this.message = '';
            this.type = '';

            $('#resetSaveForm').trigger('click');
            this.selectedEvent = null;
          }, 2000);
          this.getEvents();
        })
        .catch((err) => {
          console.error(err.response.data.message);
          this.message = err.response.data.message || 'Something went wrong';
          this.type = 'ERROR';
        })
        .finally(() => {
          this.busy = false;
        });
    } else {
      this.eventService
        .createEvent({
          name: this.name,
          venue: this.venue,
          from: this.from,
          to: this.to,
        })
        .then(() => {
          this.message = 'Event created';
          this.type = 'SUCCESS';
          this.busy = false;
          setTimeout(() => {
            $('#saveEvent').hide();
            $('.modal-backdrop').remove();
            this.message = '';
            this.type = '';

            $('#resetSaveForm').trigger('click');
            this.selectedEvent = null;
          }, 2000);
          this.getEvents();
        })
        .catch((err) => {
          console.error(err.response.data.message);
          this.message = err.response.data.message || 'Something went wrong';
          this.type = 'ERROR';
        })
        .finally(() => {
          this.busy = false;
        });
    }
  }

  reset() {
    $('#resetSaveForm').trigger('click');
  }
}
