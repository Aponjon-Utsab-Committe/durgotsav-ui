import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from '../views/events/events.component';
import { SigninComponent } from '../views/signin/signin.component';
import { ManageEventComponent } from '../views/manage-event/manage-event.component';
import { AuthGuard } from '../guard/auth.guard';
import { EventComponent } from '../views/event/event.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/manage', component: ManageEventComponent, canActivate: [AuthGuard] },
  { path: 'events/:eventId', component: EventComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
