import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { PokemonListComponent } from '../components/pokemon-list/pokemon-list.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { PokemonDetailsComponent } from '../components/pokemon-details/pokemon-details.component';


const routes: Route[] = [
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'pokedex', component: PokemonListComponent },
  { path: 'pokedex/:name', component: PokemonDetailsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRouterModule { }
