import { NgModule } from '@angular/core';

import { PokemonListModule } from './pokemon-list/pokemon-list.module';
import { PokemonFormModule } from './pokemon-form/pokemon-form.module';
import { PokemonDetailsModule } from './pokemon-details/pokemon-details.module';


@NgModule({
  declarations: [],
  imports: [
    PokemonFormModule,
    PokemonListModule,
    PokemonDetailsModule
  ]
})
export class PokemonModule { }
