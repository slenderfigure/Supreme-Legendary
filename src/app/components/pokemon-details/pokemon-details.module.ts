import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { BaseStatsComponent } from './base-stats/base-stats.component';
import { EvolutionsComponent } from './evolutions/evolutions.component';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';


@NgModule({
  declarations: [
    PokemonDetailsComponent,
    BaseStatsComponent,
    EvolutionsComponent,
    NavigationButtonsComponent
  ],
  imports: [ SharedModule ]
})
export class PokemonDetailsModule { }