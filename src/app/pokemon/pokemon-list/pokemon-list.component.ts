import { Component, OnInit, AfterViewInit } from '@angular/core';

import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: [
    './pokemon-list.component.css',
    '../../shared/pokemon-common.css'
  ],
  providers: [ PokemonService ]
})
export class PokemonListComponent implements OnInit, AfterViewInit {
  private pokedex: Pokemon[];
  filteredPokedex: Pokemon[];
  tableHeaders: string[] = [];
  loading: boolean = true;

  private _pokedexFilter: string;
  get pokedexFilter(): string {
    return this._pokedexFilter;
  }
  set pokedexFilter(value: string) {
    this._pokedexFilter = value;
    this.filteredPokedex = this.pokedexFilter ? 
      this.filterPokedex(this.pokedexFilter) : this.pokedex;
  }

  activePage: number = 0;
  pokemonPerPage: number = 12;
  pageCount: number = 0;

  constructor(private ps: PokemonService) { }

  ngOnInit(): void {
    this.loadPokedex(this.activePage, this.pokemonPerPage);    
    this.tableHeaders = ['Entry Number', 'Image', 'Name', 'Type', 'Rating'];
  }

  ngAfterViewInit(): void {
  }

  private loadPokedex(start?: number, end?: number): void {
    this.ps.getPokedex().subscribe(pokedex => {
      this.pokedex = pokedex.sort((a, b) => +a.entryNumber - +b.entryNumber).slice(start, end);
      this.filteredPokedex = this.pokedex;
      this.pageCount = Math.ceil(pokedex.length / this.pokemonPerPage);
      this.loading = false;
    });
  }

  changePage(nextPage: number): void {
    this.loading = true; 
    this.activePage = nextPage;
    this.pokedexFilter = '';

    this.loadPokedex(
      this.activePage * this.pokemonPerPage, 
      (this.activePage * this.pokemonPerPage) + this.pokemonPerPage
    );
  }

  private filterPokedex(filterBy: string): Pokemon[] {
    const myRegex = new RegExp(`${filterBy}`, 'i');

    return this.pokedex.filter(pokemon => myRegex.test(pokemon.name));
  }

}
