import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonDetailsGuard } from './pokemon-details.guard';


const routes: Route[] = [
  { 
    path: 'pokedex', component: PokemonListComponent, 
    data: { title: 'National Pokedex'} 
  },
  { 
    path: 'pokedex/:name', 
    canActivate: [ PokemonDetailsGuard ],
    component: PokemonDetailsComponent
  },
  { path: 'add-new', component: PokemonFormComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PokemonRoutingModule { }
