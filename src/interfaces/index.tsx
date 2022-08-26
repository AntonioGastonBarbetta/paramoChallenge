export interface Pokemon {
  id: string;
  name: string;
}

export interface PokemonDetail {
  evolutions: Pokemon[];
  name: string;
  height: number;
  weight: number;
  abilities: string[];
  types: string[];
  image: string;
}
