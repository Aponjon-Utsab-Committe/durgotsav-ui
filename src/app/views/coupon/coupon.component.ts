import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css'],
})
export class CouponComponent implements OnInit {
  eventId!: number;
  couponId!: number;
  coupon!: any;
  saveDisabled: boolean = true;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(({ eventId, couponId }) => {
      this.eventId = eventId;
      this.couponId = couponId;
    });
  }

  ngOnInit(): void {
    this.getCoupon();
  }

  getCoupon() {
    this.eventService
      .getCoupon(this.eventId, this.couponId)
      .then(({ data }) => {
        this.coupon = data;
      })
      .catch(() => {
        this.router.navigate([`events/${this.eventId}`]);
      });
  }

  select(usage: any, mode: '+' | '-') {
    if (!usage.selected) {
      usage.selected = 0;
    }

    if (mode == '+') {
      usage.selected++;
    } else {
      usage.selected--;
    }

    this.checkChange();
  }

  checkChange() {
    this.saveDisabled = true;
    for (let u of this.coupon.usage) {
      if (u.selected && u.selected > 0) {
        this.saveDisabled = false;
      }
    }
  }

  useCoupon() {
    this.eventService
      .useCoupon(this.eventId, this.couponId, this.coupon.usage)
      .then(({ data }) => {
        this.getCoupon();
      });
  }
}
