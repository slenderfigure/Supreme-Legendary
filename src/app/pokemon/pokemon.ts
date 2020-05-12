export interface Pokemon {
  entryNumber: string | number;
  name: string;
  altName?: string;
  imageUrl: string;
  iconUrl?: string;
  description: string;
  traits: {
    height: string,
    weight: number
  };
  gender?: {
    male: boolean,
    female: boolean
  }
  category: string;
  abilities: string[];
  types: string[];
  weaknesses: string[];
  hasAlternateForms?: boolean;
  evolutions?: number[];
  alternateEvolutions?: number[];
  evolutionOrder?: number;
  baseStats?: {
    hp: number,
    attack: number,
    defense: number,
    spAtk: number,
    spDef: number,
    speed: number
  }
}