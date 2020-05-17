import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Pokemon } from '../pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { CustomFormControls } from '../form-control';

@Component({
  selector: 'pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: [
    './pokemon-form.component.css',
    '../../shared/pokemon-common.css'
  ]
})
export class PokemonFormComponent implements OnInit {
  fields: CustomFormControls[];
  pokemonForm: FormGroup;
  isAlternate: boolean = false;

  pokemon: Pokemon = {
    entryNumber: '',
    name: '',
    altName: '',
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
  imgSRC: string = 'assets/pokemon-imgs/';


  constructor(private ps: PokemonService) { }

  ngOnInit(): void {
    this.ps.formFields.subscribe(fields => {
      this.fields = fields;
      this.createForm(this.fields);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.pokemonForm.get('entryNumber').valueChanges.subscribe(val => {
        if (val) {
          this.imgPreview = 
          !this.isAlternate ? `${this.imgSRC}detail/${val}.png` :
          `${this.imgSRC}detail/${val}_f2.png`;
        }
      });
    }, 500);
  }

  createForm(fields: CustomFormControls[]): void {
    let group: any = {};

    fields.forEach(field => {
      group[field.key] = new FormControl(field.value || '', Validators.required);
    });
    this.pokemonForm = new FormGroup(group);
  }

  onSubmit(): void {
    this.sanitaziePokemonData();
  }

  sanitaziePokemonData(): void {
    this.resetPokemon();
    this.manageName();
    this.pokemon.entryNumber = this.pokemonForm.get('entryNumber').value.trim();
    this.manageBasicInformation();
    this.manageGender();
    this.pokemon.category = this.pokemonForm.get('category').value.trim();
    this.pokemon.abilities = this.selectedAbilities;
    this.pokemon.types = this.pokemonTypes;
    this.pokemon.weaknesses = this.pokemonWeaknesses;
    this.manageEvolutions();
    this.manageBaseStats();
    this.managePokemonImage();
  }

  private resetPokemon(): void {
    this.pokemon['gender'] = { female: false, male: false }
  }

  private managePokemonImage(): void {
    this.pokemon.imageUrl = 
      !this.isAlternate ? `${this.imgSRC}full/${this.pokemon.entryNumber}.png` :
      `${this.imgSRC}full/${this.pokemon.entryNumber}_f2.png`;

    this.pokemon.iconUrl = this.imgPreview;
  }

  private manageName(): void {
    if (this.isAlternate) {
      this.pokemon.name = this.pokemonForm.get('name').value.trim() || 'Alolan Form';
    } else {
      this.pokemon.name = this.pokemonForm.get('name').value.trim();
    }

    if (this.pokemonForm.get('altName').value) {
      this.pokemon.altName = this.pokemonForm.get('altName').value.trim();
    } else {
      delete this.pokemon.altName;
    }
  }

  private manageBasicInformation(): void {
    this.pokemon.description = this.pokemonForm.get('description').value.trim();
    this.pokemon.traits.height = this.pokemonForm.get('height').value.trim();
    this.pokemon.traits.weight = +this.pokemonForm.get('weight').value;
  }

  private manageGender(): void {
    const gender = this.pokemonForm.get('gender').value;

    if (gender && gender.length) {
      gender.forEach((val: string) => {
        this.pokemon['gender'][val.toLowerCase()] = true;
      });
      
    } else {
      delete this.pokemon.gender;
    }
  }

  private manageEvolutions(): void {
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
  }

  private manageBaseStats(): void {
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
}
