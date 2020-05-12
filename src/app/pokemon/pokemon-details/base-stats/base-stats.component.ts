import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { Pokemon } from '../../pokemon';

@Component({
  selector: 'base-stats',
  templateUrl: './base-stats.component.html',
  styleUrls: [
    './base-stats.component.css',
    '../../../shared/pokemon-common.css'
  ]
})
export class BaseStatsComponent implements OnInit {
  @Input() pokemon: Pokemon;
  stats: any[] = [
    { key: 'HP',      value: 0, rank: 0 },
    { key: 'Attack',  value: 0, rank: 0 },
    { key: 'Defense', value: 0, rank: 0 },
    { key: 'Sp. Atk', value: 0, rank: 0 },
    { key: 'Sp. Def', value: 0, rank: 0 },
    { key: 'Speed',   value: 0, rank: 0 },
    { key: 'Total',   value: 0 },
  ];
  
  getRankClass(value: number): any {
    return {
      'bar-low': value < 30,
      'bar-mid': value < 60 && value >= 30,
      'bar-average': value < 90 && value >= 60,
      'bar-good': value <= 115 && value >= 90,
      'bar-high': value < 150 && value > 115,
      'bar-very-high': value >= 150
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setPokemonStats();
  }

  private setPokemonStats(): void {
    const arr: number[] = [];

    for (let key in this.pokemon.baseStats) {
      arr.push(this.pokemon.baseStats[key]);
    }
    arr.forEach((val, index) => {
      this.stats[index].value = val;
      this.stats[index].rank = this.getPercentage(val);
    });
    this.stats[this.stats.length - 1].value = arr.reduce((a, b) => a + b, 0);
  }

  private getPercentage(value: number): number {
    const threshold = 200;
    return (value / threshold) * 100;
  }
}
