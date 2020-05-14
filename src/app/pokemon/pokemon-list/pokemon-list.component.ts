import { Component, OnInit, AfterViewInit } from '@angular/core';

import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../pokemon';
import { Observable } from 'rxjs';

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
  loading: boolean = true;

  activePage: number = 0;
  pokemonPerPage: number = 12;
  pageCount: number = 0;

  constructor(private ps: PokemonService) { }

  ngOnInit(): void {
    this.loadPokedex(this.activePage, this.pokemonPerPage);    
    this.ps.pokemonCount.subscribe(num => {
      this.pageCount = Math.ceil(num / this.pokemonPerPage);
    });
  }

  ngAfterViewInit(): void {
  }

  private loadPokedex(start: number, end: number): void {
    this.ps.getSlicedPokedex(start, end).subscribe(value => {
      this.pokedex = value;
      this.filteredPokedex = this.pokedex;
      this.loading = false;
    });
  }

  changePage(nextPage: number): void {
    this.loading = true; 
    this.activePage = nextPage;

    this.loadPokedex(
      this.activePage * this.pokemonPerPage, 
      (this.activePage * this.pokemonPerPage) + this.pokemonPerPage
    );
  }
}
