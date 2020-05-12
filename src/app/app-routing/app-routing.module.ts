import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const route: Route[] = [
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(route) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}