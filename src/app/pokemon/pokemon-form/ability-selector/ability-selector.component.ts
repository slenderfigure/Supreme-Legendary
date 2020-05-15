import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'ability-selector',
  templateUrl: './ability-selector.component.html',
  styleUrls: [
    './ability-selector.component.css',
    '../pokemon-form.component.css'
  ]
})
export class AbilitySelectorComponent implements OnInit {
  @ViewChild('abilityInput') abilityInput: ElementRef<HTMLInputElement>;
  @ViewChild('abilityDropdown') abilityDropdown: ElementRef<HTMLElement>;
  @Output() notifyChange: EventEmitter<string[]> = new EventEmitter();
  selectedAbilities: string[] = [];
  searchMatches: string[] = [];
  keyIndex: number = 0;

  constructor(private ps: PokemonService) { }

  ngOnInit(): void {
  }

  resetDefaults(): void {
    this.abilityInput.nativeElement.value = '';
    this.searchMatches = [];
    this.keyIndex = 0;
  }

  abilitySearcher(input: HTMLInputElement): void {
    if(input.value) {
      let word = input.value.trim().toLowerCase();

      this.ps.getAbilities().subscribe((abilities: string[]) => {
        let unselected = abilities.filter(existing => {
          return this.selectedAbilities.indexOf(existing) < 0;
        }); 
  
        this.searchMatches = unselected.filter(val => {
          return val.toLowerCase().slice(0, word.length) == word;
        }).slice(0, 8);
      });
    } else {
      this.resetDefaults();
    }
  }

  onMatchClick(ability: string): void {
    this.selectedAbilities.push(ability);
    this.notifyChange.emit(this.selectedAbilities);
    this.resetDefaults();
  }

  onKeydown(e: KeyboardEvent): void {
    const matches = 
      Array.from(this.abilityDropdown.nativeElement.children);

    switch(e.key) {
      case 'ArrowDown':
        this.keyIndex = this.keyIndex < this.searchMatches.length - 1 ?
          this.keyIndex += 1 : 0
        break;
        
      case 'ArrowUp':
        this.keyIndex = this.keyIndex > 0 ?
          this.keyIndex -= 1 : this.searchMatches.length - 1
        break;
      
      case 'Enter':
        e.preventDefault();
        this.onMatchClick(matches[this.keyIndex].textContent.trim());
        break;

      default:
        return;
    }
  }

  removeSelected(ability: string): void {
    this.selectedAbilities = this.selectedAbilities.filter(val => {
      return val != ability;
    });
    this.notifyChange.emit(this.selectedAbilities);
  }

}
