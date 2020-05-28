import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, fromEvent, of } from 'rxjs';
import { map, filter, tap, catchError, delay } from 'rxjs/operators';

import { Pokemon } from '../pokemon/pokemon';
import { CustomFormControls } from '../pokemon/form-control';


@Injectable({providedIn: 'root'})
export class PokemonService {
  private url = '../api/pokedex.json';

  get types(): Observable<string[]> {
    return of([
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
    ]);
  }

  constructor(private http: HttpClient) { }

  getPokedex(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.url).pipe(
      catchError(this.errorHandler)
    );
  }

  searchByTerm(term: string): Observable<Pokemon[]> {
    return this.getPokedex().pipe(
      map(pokedex => {
        return term.length >= 2 ? pokedex.filter(match => {
          return match.name.toLowerCase().slice(0, term.length) == term ||
            match.entryNumber.toString().match(term);
        }).slice(0, 5) : [];
      }),
      catchError(this.errorHandler)
    );
  }

  getPageCount(itemPerPage: number): Observable<number> {
    return this.http.get<Pokemon[]>(this.url).pipe(
      map(pokedex => {
        return Math.ceil(pokedex.length / itemPerPage);
      })
    );
  }

  getSlicedPokedex(start: number, end: number): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.url).pipe(
      map(pokedex => {
        return pokedex.sort((a, b) => +a.entryNumber - +b.entryNumber).slice(start, end);
      }),
      catchError(this.errorHandler)
    );
  }

  getAlternateForms(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('../api/alternate-forms.json').pipe(
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