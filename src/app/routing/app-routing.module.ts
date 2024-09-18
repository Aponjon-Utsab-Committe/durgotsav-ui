import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from '../views/events/events.component';
import { SigninComponent } from '../views/signin/signin.component';

const routes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
