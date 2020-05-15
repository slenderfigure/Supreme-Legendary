import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'types-selector',
  templateUrl: './types-selector.component.html',
  styleUrls: [
    './types-selector.component.css',
    '../../../shared/pokemon-common.css'
  ]
})
export class TypesSelectorComponent implements OnInit {
  @Output() notifyTypes: EventEmitter<any[]> = new EventEmitter();
  @Output() notifyWeaknesses: EventEmitter<any[]> = new EventEmitter();
  types: Observable<string[]>;
  pokemonTypes: any = [];
  pokemonWeaknesses: any = [];

  constructor(private ps: PokemonService) { }

  ngOnInit(): void {
    this.types = this.ps.types;
  }

  onTypeSelection(input: HTMLInputElement): void {
    const inputs = <HTMLInputElement[]>
      Array.from(document.querySelectorAll(`input[name="types"]`));

    if(input.checked) {
      this.pokemonTypes.push(input.value);
    } else {
      this.pokemonTypes = 
        this.pokemonTypes.filter(cur => cur !== input.value);
    }

    if (this.pokemonTypes.length == 2) {
      inputs.map(cur => {
        if (!cur.checked) { cur.disabled = true; }
      });
    } else {
      inputs.map(cur => cur.disabled = false);
    }
    this.notifyTypes.emit(this.pokemonTypes);
  }

  onWeaknessSelection(input: HTMLInputElement): void {
    if(input.checked) {
      this.pokemonWeaknesses.push(input.value);
    } else {
      this.pokemonWeaknesses = 
        this.pokemonWeaknesses.filter(cur => cur !== input.value);
    }
    this.notifyWeaknesses.emit(this.pokemonWeaknesses);
  }

}
