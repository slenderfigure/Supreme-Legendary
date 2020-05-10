import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRouterModule } from './app-router/pokemon-router.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RepeatPipe } from './shared/repeat.pipe';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { StarRating } from './shared/star-rating/star-rating.component';
import { PaginationComponent } from './components/pokemon-list/pagination/pagination.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { AbilitySelectorComponent } from './components/pokemon-form/ability-selector/ability-selector.component';
import { TypesSelectorComponent } from './components/pokemon-form/types-selector/types-selector.component';
import { ImagePreviewerComponent } from './components/pokemon-form/image-previewer/image-previewer.component';
import { EvolutionsComponent } from './components/pokemon-details/evolutions/evolutions.component';
import { NavigationButtonsComponent } from './components/pokemon-details/navigation-buttons/navigation-buttons.component';
import { BaseStatsComponent } from './components/pokemon-details/base-stats/base-stats.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RepeatPipe,
    PokemonListComponent,
    SpinnerComponent,
    StarRating,
    PaginationComponent,
    NavbarComponent,
    NotFoundComponent,
    PokemonDetailsComponent,
    PokemonFormComponent,
    AbilitySelectorComponent,
    TypesSelectorComponent,
    ImagePreviewerComponent,
    EvolutionsComponent,
    NavigationButtonsComponent,
    BaseStatsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
