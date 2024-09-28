import { Component, OnInit } from '@angular/core';
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
  events: Array<any> = new Array();
  selectedEvent: any;
  busy: boolean = false;
  message: string = '';
  role: string = '';

  constructor(private eventService: EventService, authService: AuthService) {
    this.role = authService.userInfo?.role;
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventService
      .getEvents(this.onlyActive ? 'ACTIVE' : '')
      .then(({ data }) => {
        this.events = data.list;
      });
  }

  promtDelete(e: any) {
    this.selectedEvent = e;
  }

  deleteEvent() {
    this.message = '';
    this.busy = true;

    this.eventService
      .updateEvent(this.selectedEvent.id, {
        status: 'CANCELLED',
      })
      .then(() => {
        this.message = 'Record deleted';
        this.busy = false;
        setTimeout(() => {
          $('#deleteConfirmation').hide();
          $('.modal-backdrop').remove();
        }, 2000);
        this.getEvents();
      })
      .catch((err) => {
        console.error(err.response.data.message);
        this.message = err.response.data.message || 'Something went wrong';
      })
      .finally(() => {
        this.busy = false;
      });
  }
}
