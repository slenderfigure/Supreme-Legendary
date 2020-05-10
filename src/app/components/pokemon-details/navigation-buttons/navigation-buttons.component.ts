import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Pokemon } from '../../pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.css']
})
export class NavigationButtonsComponent implements OnInit {
  @Input() pokemon: Pokemon;
  prevPokemon: Pokemon;
  nextPokemon: Pokemon;

  constructor(private ps: PokemonService) { }

  ngOnInit(): void {
    this.ps.getPokedex().subscribe(pokedex => {
      this.setNavLinkPokemon(
        pokedex.sort((a, b) => +a.entryNumber - +b.entryNumber)
      );
    });
  }

  setNavLinkPokemon(pokedex: Pokemon[]): void {
    const index = pokedex.findIndex(pokemon => {
      return +pokemon.entryNumber == +this.pokemon.entryNumber;
    });
    const prevIndex = (index - 1) > -1 ? (index - 1) : pokedex.length - 1;
    const nextIndex = (index + 1) < pokedex.length ? (index + 1) : 0;

    this.prevPokemon = pokedex[prevIndex]; 
    this.nextPokemon = pokedex[nextIndex];
  }
  
}
