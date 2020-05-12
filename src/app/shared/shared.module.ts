import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PokemonRoutingModule } from '../pokemon/pokemon-routing.module';

import { RepeatPipe } from './repeat.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { StarRating } from './star-rating/star-rating.component';


@NgModule({
  declarations: [
    RepeatPipe,
    SpinnerComponent,
    StarRating
  ],
  imports: [ CommonModule ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    PokemonRoutingModule,
    RepeatPipe,
    SpinnerComponent,
    StarRating
  ]
})
export class SharedModule { }