import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';


import { Observable } from 'rxjs';
import { map, debounceTime, switchMap } from 'rxjs/operators';

import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from '../../pokemon';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: [
    './filter-options.component.css',
    '../../../shared/pokemon-common.css'
  ]
})
export class FilterOptionsComponent implements OnInit, AfterViewInit {
  searchControl: FormControl = new FormControl('');
  @ViewChildren('typeOptions') typeOptions: QueryList<ElementRef>;
  @Output() notifyFiltered: EventEmitter<Pokemon | Pokemon[]> = new EventEmitter();
  showAdvanced: boolean = false;
  matches: Pokemon[] = [];
  keyIndex: number = -1;
  dualType: boolean = true;
  types$: Observable<string[]>;

  constructor(
    private router: Router,
    private ps: PokemonService
  ) { }

  ngOnInit(): void {
    this.types$ = this.ps.types;
    this.searchByName();
  }

  ngAfterViewInit(): void {
  }

  onBlur(event: FocusEvent): void {
    if (!event.relatedTarget) { 
      this.resetDefaults();
    }
  }

  searchByName(): void {
    this.searchControl.valueChanges.pipe(
      map((val: string) => val.trim().toLowerCase()),
      debounceTime(500),
      switchMap(() => this.ps.getPokedex()),
      map((matches: Pokemon[]) => {
        return matches.filter(match => {
          return match.name.toLowerCase()
        });
      })
    ).subscribe(val => console.log(val));


    // let _value = value.trim().toLowerCase();
    
    // if (_value) {
    //   this.ps.getPokedex().subscribe(pokedex => {
    //     this.matches = pokedex.filter(match => {
    //       return match.name.toLowerCase().slice(0, _value.length) == _value ||
    //         match.entryNumber.toString().match(_value);
    //     }).slice(0, 5);
    //   });
    // } else {
    //   this.resetDefaults();
    // }
  }

  onKeyDown(e: KeyboardEvent): void {
    if (!this.searchControl.value) { return; }

    const replaceInputValue = () => {
      this.searchControl.setValue(this.matches[this.keyIndex].name);
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.keyIndex = this.keyIndex < this.matches.length - 1 ? 
          this.keyIndex += 1 : this.keyIndex = 0;
          replaceInputValue();
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        this.keyIndex = this.keyIndex > 0 ? 
          this.keyIndex -= 1 : this.keyIndex = this.matches.length - 1;
          replaceInputValue();
        break;

      case 'Enter':
        if (this.keyIndex > -1) {
          const name = this.matches[this.keyIndex].name.toLowerCase();
          this.router.navigate(['/pokedex', name]);
        }
        break;

      case 'Escape':
      case 'Tab':
        this.resetDefaults();
        break;
    }
  }

  filterType(): void {
    const options = this.typeOptions.map(ele => ele.nativeElement as HTMLInputElement);
    const checked = options.filter(opt => opt.checked).map(opt => opt.value);
    let result: Pokemon[] = [];

    this.ps.getPokedex().subscribe(pokedex => {
      if (this.dualType) {
        result = pokedex.filter(pokemon => {
          return pokemon.types.filter(type => checked.indexOf(type) > -1).length;
        });
      } else {
        result = pokedex.filter(pokemon => {
          return pokemon.types.length == 1 && 
            pokemon.types.filter(type => checked.indexOf(type) > -1).length;
        });
      }
      this.notifyFiltered.emit(result);
    });


  }

  resetTypeFilter(): void {
    this.typeOptions.map(ele => ele.nativeElement as HTMLInputElement)
      .map(option => option.checked = false);
  }

  resetDefaults(): void {
    this.matches = [];
    this.keyIndex = -1;
  }

}
