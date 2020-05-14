import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PokemonListComponent } from './pokemon-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FilterOptionsComponent } from './filter-options/filter-options.component';


@NgModule({
  declarations: [
    PokemonListComponent,
    PaginationComponent,
    FilterOptionsComponent
  ],
  imports: [ SharedModule ]
})
export class PokemonListModule { }
