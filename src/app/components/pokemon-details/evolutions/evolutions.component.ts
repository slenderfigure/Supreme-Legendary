import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Input } from '@angular/core';

import { Pokemon } from '../../pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: [
    './evolutions.component.css',
    '../../../shared/pokemon-common.css'
  ]
})
export class EvolutionsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() pokemon: Pokemon;
  evolutions: Pokemon[] = [];
  lineType: string;
  alternateFormImage: string;
  private hasScrolled: boolean = false;

  get altEvolutionsClass(): any {
    return {
      'column-xl': this.evolutions.length <= 3,
      'column-xl-2': this.evolutions.length > 3
    }
  }

  get scrollClass(): any {
    return { 'scrolled': this.hasScrolled, 'scroll-stop': !this.hasScrolled }
  }

  constructor(private ps: PokemonService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setLineType();
    this.getEvolutions();
    window.addEventListener('scroll', () => this.onScroll());
    this.alternateFormImage = this.pokemon.iconUrl;
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  setLineType(): void {
    if (this.pokemon.evolutions) {
      this.lineType = 'evolutions';
    } else if (this.pokemon.alternateEvolutions) {
      this.lineType = 'alternateEvolutions';
    }
  }

  getEvolutions(): void {
    if (this.lineType) {
      this.ps.getPokedex().subscribe((pokedex: Pokemon[]) => {
        this.evolutions = pokedex.filter(pokemon => {
          return this.pokemon[this.lineType].indexOf(+pokemon.entryNumber) > -1;
        }).sort((a, b) => a.evolutionOrder - b.evolutionOrder);
      });
    }
  }

  private onScroll(): void {
    if (window.scrollY >= 400) { this.hasScrolled = true; } 
    if (window.scrollY <= 350) { this.hasScrolled = false; }
  }
}
