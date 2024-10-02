import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  id!: number;
  event: any;
  activities: Array<any> = new Array();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(({ eventId }) => {
      this.id = eventId;
    });
  }

  ngOnInit(): void {
    this.eventService
      .getEvent(this.id)
      .then(({ data }) => {
        this.event = data;
        this.activities = data.activities;
      })
      .catch(() => {
        this.router.navigate(['events/manage']);
      });
  }
}
