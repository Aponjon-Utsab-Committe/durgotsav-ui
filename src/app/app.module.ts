import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './views/events/events.component';
import { SigninComponent } from './views/signin/signin.component';

/* ---- axios start ------ */
import axios from 'axios';
import { environment } from 'src/environments/environment';

axios.defaults.baseURL = environment.apiEndpoint;
/* ---- axios end ------ */

@NgModule({
  declarations: [AppComponent, EventsComponent, SigninComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ZXingScannerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
