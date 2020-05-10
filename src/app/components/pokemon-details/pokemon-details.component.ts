import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pokemon } from '../pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: [
    './pokemon-details.component.css',
    '../../shared/pokemon-common.css'
  ]
})
export class PokemonDetailsComponent implements OnInit {
  activePokemon: Pokemon;
  pokemon: Pokemon;
  evolutions: Pokemon[];
  altEvolutions: Pokemon[];
  altForms: Pokemon[] = [];
  loading: boolean = true;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ps: PokemonService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loading = true;
      this.getPokemonDetails(params.get('name'));
    });
  }

  private getPokemonDetails(name: string): void {
    this.ps.getPokedex().subscribe((pokedex: Pokemon[]) => {
      this.activePokemon = pokedex.find(pokemon => pokemon.name.toLowerCase() == name);
      this.pokemon = this.activePokemon;

      if (this.activePokemon.hasAlternateForms) {
        this.ps.getAlternateForms().subscribe(forms => {
          this.altForms = forms.filter(form => form.entryNumber == this.pokemon.entryNumber);
        });
      }
      this.loading = false;    
    });

  }

  onReturn(): void {
    this.router.navigate(['/pokedex']);
  }

  private animateOnSwitch(): void {
    const container = <HTMLImageElement>document.querySelector('.card');

    container.style.animation = 'reveal 0.6s linear';
    setTimeout(() => container.style.animation = 'none', 600);
  }

  switchToActive(): void {
    this.animateOnSwitch();
    this.pokemon = this.activePokemon;
  }

  switchForm(form: Pokemon): void {
    this.animateOnSwitch();
    this.pokemon = form;
  }
}
