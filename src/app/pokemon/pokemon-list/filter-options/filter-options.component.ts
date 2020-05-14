import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from '../../pokemon';

@Component({
  selector: 'filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.css']
})
export class FilterOptionsComponent implements OnInit {
  matches: Pokemon[] = [];

  constructor(private ps: PokemonService) { }

  ngOnInit(): void {
  }

  searchByName(name: string): void {
    if (name) {
      this.ps.getPokedex().subscribe(pokedex => {
        this.matches = pokedex.filter(match => {
          return match.name.toLowerCase()
            .slice(0, name.length) == name.toLowerCase();
        }).slice(0, 4);
      });
    } else {
      this.matches = [];
    }
  }
}
