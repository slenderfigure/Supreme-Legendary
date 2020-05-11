import { TestBed } from '@angular/core/testing';

import { PokemonDetailsGuard } from './pokemon-details.guard';

describe('PokemonDetailsGuard', () => {
  let guard: PokemonDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PokemonDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
