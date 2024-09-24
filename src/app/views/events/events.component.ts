import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: Array<any> = new Array();
  scannedData: string = "";

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().then(({ data }) => {
      this.events = data.list;
    });
  }

  onScan(e: any){
    this.scannedData = e;
    console.log(e);
  }
}
