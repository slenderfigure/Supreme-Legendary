import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Pokemon } from '../pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: [
    './pokemon-form.component.css',
    '../../shared/pokemon-common.css'
  ]
})
export class PokemonFormComponent implements OnInit {
  @Input() fields: any[];
  pokemonForm: FormGroup;
  isAlternate: boolean = false;

  pokemon: Pokemon = {
    entryNumber: '',
    name: '',
    description: '',
    traits: {
      height: '',
      weight: 0
    },
    gender: { male: false, female: false },
    category: '',
    abilities: [],
    types: [],
    weaknesses: [],
    evolutions: [],
    evolutionOrder: null,
    baseStats: {
      hp: 0,
      attack: 0,
      defense: 0,
      spAtk: 0,
      spDef: 0,
      speed: 0
    },
    imageUrl: ''
  };
  types: string[];
  selectedAbilities: string[] = [];

  pokemonTypes: any = [];
  pokemonWeaknesses: any = [];
  imgPreview: string;
  externalImageUrl: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/';


  constructor(private ps: PokemonService) { }

  ngOnInit(): void {
    this.pokemonForm = this.ps.createForm(this.fields);
    this.types = this.ps.types; 
  }

  ngAfterViewInit(): void {
    this.pokemonForm.get('entryNumber').valueChanges.subscribe(val => {
      if (val) {
        this.imgPreview = 
        !this.isAlternate ? `${this.externalImageUrl}detail/${val}.png` :
        `${this.externalImageUrl}detail/${val}_f2.png`;
      }
    });
  }

  onSubmit(): void {
    this.sanitaziePokemonData();
  }

  sanitaziePokemonData(): void {
    this.resetPokemon();
    
    this.pokemon.entryNumber = this.pokemonForm.get('entryNumber').value.trim();

    this.pokemon.imageUrl = 
      !this.isAlternate ? `${this.externalImageUrl}full/${this.pokemon.entryNumber}.png` :
      `${this.externalImageUrl}full/${this.pokemon.entryNumber}_f2.png`;

    this.pokemon.iconUrl = this.imgPreview;

    this.pokemon.name = this.pokemonForm.get('name').value.trim() || 'Alolan Form';

    this.pokemon.description = this.pokemonForm.get('description').value.trim();
    this.pokemon.traits.height = this.pokemonForm.get('height').value.trim();
    this.pokemon.traits.weight = +this.pokemonForm.get('weight').value;

    if (this.pokemonForm.get('gender').value) {
      const _gender = <any[]>this.pokemonForm.get('gender').value;

      if (!('gender' in this.pokemon)) {
        this.pokemon.gender = { male: false, female: false };
      }
      _gender.forEach((val: string) => {
        this.pokemon['gender'][val.toLowerCase()] = true;
      });
      
    } else {
      delete this.pokemon.gender;
    }

    this.pokemon.category = this.pokemonForm.get('category').value.trim();
    this.pokemon.abilities = this.selectedAbilities;
    this.pokemon.types = this.pokemonTypes;
    this.pokemon.weaknesses = this.pokemonWeaknesses;

    if (this.pokemonForm.get('evolutions').value) {
      this.pokemon.evolutions = 
      this.pokemonForm.get('evolutions').value.split(', ').map(val => +val);
    } else {
      delete this.pokemon.evolutions;
    }

    if (this.pokemonForm.get('evolutionOrder').value) {
      this.pokemon.evolutionOrder = +this.pokemonForm.get('evolutionOrder').value;
    } else {
      delete this.pokemon.evolutionOrder;
    }

    this.pokemon.baseStats.hp = +this.pokemonForm.get('hp').value;
    this.pokemon.baseStats.attack = +this.pokemonForm.get('attack').value;
    this.pokemon.baseStats.defense = +this.pokemonForm.get('defense').value;
    this.pokemon.baseStats.spAtk = +this.pokemonForm.get('spAtk').value;
    this.pokemon.baseStats.spDef = +this.pokemonForm.get('spDef').value;
    this.pokemon.baseStats.speed = +this.pokemonForm.get('speed').value;
  }

  copyToClipboard(target: HTMLElement): void {
    const ele = <HTMLInputElement>document.createElement('input');
    ele.value = target.innerHTML;
    document.body.appendChild(ele);

    ele.select();
    document.execCommand('copy');
    document.body.removeChild(ele);
  }

  resetPokemon(): void {
    this.pokemon.evolutions = [];
    this.pokemon.evolutionOrder = null;
  }
}
