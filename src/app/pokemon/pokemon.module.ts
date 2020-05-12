import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PokemonListModule } from './pokemon-list/pokemon-list.module';
import { PokemonFormModule } from './pokemon-form/pokemon-form.module';
import { PokemonDetailsModule } from './pokemon-details/pokemon-details.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    PokemonFormModule,
    PokemonListModule,
    PokemonDetailsModule
  ]
})
export class PokemonModule { }
