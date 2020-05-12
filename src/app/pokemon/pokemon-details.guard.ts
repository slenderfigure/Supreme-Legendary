import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { PokemonService } from '../services/pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsGuard implements CanActivate {

  constructor(
    private ps: PokemonService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return new Observable(observer => {
      const subscription = this.ps.getPokedex().subscribe(pokedex => {
        if (!pokedex.find(pokemon => pokemon.name.toLowerCase() == next.params.name)) {
          this.router.navigate(['**']);
          observer.next(false);
        } else {
          observer.next(true);
        }
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      }
    });
  }
  
}
