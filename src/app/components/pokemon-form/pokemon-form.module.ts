import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PokemonFormComponent } from './pokemon-form.component';
import { AbilitySelectorComponent } from './ability-selector/ability-selector.component';
import { ImagePreviewerComponent } from './image-previewer/image-previewer.component';
import { TypesSelectorComponent } from './types-selector/types-selector.component';


@NgModule({
  declarations: [
    PokemonFormComponent,
    AbilitySelectorComponent,
    ImagePreviewerComponent,
    TypesSelectorComponent
  ],
  imports: [ SharedModule ]
})
export class PokemonFormModule { }