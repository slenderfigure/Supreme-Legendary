import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';

const route: Route[] = [
  { path: 'home', component: ReactiveFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(route) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}