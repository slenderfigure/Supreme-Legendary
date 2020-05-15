import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors, AbstractControl, AsyncValidatorFn, FormGroup, FormBuilder } from '@angular/forms';

import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../pokemon/pokemon';
import { Observable } from 'rxjs';
import { map, delay, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  originalPokedex: Pokemon[] = [];
  form: FormGroup;
  matches: Pokemon[] = [];

  constructor(
    private ps: PokemonService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        '',
        [ Validators.required, Validators.pattern(/^[A-z]+$/) ],
        [ this.asyncValidator() ]
      ]
    });

    this.name.valueChanges.pipe(
      map((val: string) => {
        return val.slice(0, 1).toUpperCase() + val.slice(1).toLowerCase();
      }),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(val => console.log(val));
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }
  
  onSubmit(): void {
    console.log(this.form.get('name').errors);
  }

  syncValidator(control: AbstractControl): ValidationErrors | null {
    const pattern: RegExp =  /^\d+$/; 

    return !pattern.test(control.value) ? 
    { invalid: { meetsFormat: false, actualValue: control.value} } : null;
  }

  asyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.ps.getPokedex().pipe(
        map((pokedex: Pokemon[]) => {
          const matches = pokedex.some(pokemon => {
            return pokemon.name.toLowerCase() == control.value.toLowerCase();
          });
          return matches ? 
            { exists: { pokemonExists: true, name: control.value } } : null;
        })
      );
    }
  }
}
