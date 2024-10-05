import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  id!: number;
  mode: 'INFO' | 'COUPONS' | 'COUPON' = 'COUPONS';
  event: any;
  activities: Array<any> = new Array();
  coupons: Array<any> = new Array();
  couponsFiltered: Array<any> = new Array();
  query: string = '';

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
    this.getEvent();
    this.getCoupons();
  }

  getEvent() {
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

  getCoupons() {
    this.eventService
      .getCoupons(this.id)
      .then(({ data }) => {
        this.coupons = data;
        this.couponsFiltered = data;
      })
      .catch(() => {
        this.router.navigate(['events/manage']);
      });
  }

  search() {
    this.couponsFiltered = _.filter(this.coupons, (c) => {
      return (
        c.number.indexOf(this.query) > -1 || c.owner.indexOf(this.query) > -1
      );
    });
  }
}
