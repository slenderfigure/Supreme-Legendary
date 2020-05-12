import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PokemonListComponent } from './pokemon-list.component';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    PokemonListComponent,
    PaginationComponent
  ],
  imports: [ SharedModule ]
})
export class PokemonListModule { }
