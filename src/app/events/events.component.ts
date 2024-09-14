import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: Array<any> = new Array();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().then(({ data }) => {
      this.events = data.list;
    });
  }
}
