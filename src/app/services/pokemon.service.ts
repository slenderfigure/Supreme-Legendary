import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, fromEvent, of } from 'rxjs';
import { map, filter, tap, catchError, delay } from 'rxjs/operators';

import { Pokemon } from '../components/pokemon';
import { CustomFormControls } from '../components/form-control';


@Injectable({providedIn: 'root'})
export class PokemonService {
  private url = '../api/pokedex.json';

  get types(): string[] {
    return [
      'Normal',
      'Fire',
      'Water',
      'Electric',
      'Grass',
      'Ice',
      'Fighting',
      'Poison',
      'Ground',
      'Flying',
      'Psychic',
      'Bug',
      'Rock',
      'Ghost',
      'Dragon',
      'Dark',
      'Steel',
      'Fairy'
    ];
  }

  
  constructor(private http: HttpClient) { }

  getPokedex(): Observable<Pokemon[]> {
    return this.http.get<any[]>(this.url).pipe(
      catchError(this.errorHandler)
    );
  }

  getAlternateForms(): Observable<Pokemon[]> {
    return this.http.get<any[]>('../api/alternate-forms.json').pipe(
      catchError(this.errorHandler)
    );
  }

  getAbilities(): Observable<string[]> {
    return this.http.get<string[]>('../api/abilities.json').pipe(
      catchError(this.errorHandler)
    );
  }

  get formFields(): Observable<CustomFormControls[]> {
    return this.http.get<CustomFormControls[]>('../api/form-fields.json').pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}. ERROR: ${err.message}`;
    }
    return throwError(errorMessage);
  }

}