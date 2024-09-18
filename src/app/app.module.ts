import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './views/events/events.component';
import { SigninComponent } from './views/signin/signin.component';

@NgModule({
  declarations: [AppComponent, EventsComponent, SigninComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
