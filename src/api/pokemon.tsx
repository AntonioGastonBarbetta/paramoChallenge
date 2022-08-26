import { Pokemon, PokemonDetail } from "../interfaces";

const uri = "https://beta.pokeapi.co/graphql/v1beta";

const POKEMON_LIST_QUERY = (param: any) => {
  const { name, order } = param;

  return `{
  pokemon_v2_pokemon(where: {name: {_regex: "${name}"}}, order_by: {${order}}) {
    id
    name
  }
}`;
};

const POKEMON_DETAIL_QUERY = (param: string) => {
  return `{
  pokemon_v2_pokemon(where: {id: {_eq: ${param}}}) {
    name
    height
    weight
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemonspecy {
      pokemon_v2_evolutionchain {
        pokemon_v2_pokemonspecies {
          name
          id
        }
      }
    }
  }
}`;
};

export async function fetchPokemones(param: any) {
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Method-Used": "graphiql",
    },
    body: JSON.stringify({ query: POKEMON_LIST_QUERY(param) }),
  });

  const pokemon = await response.json();
  return pokemon.data.pokemon_v2_pokemon as Pokemon[];
}

export const fetchPokemon = async (id: string) => {
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Method-Used": "graphiql",
    },
    body: JSON.stringify({ query: POKEMON_DETAIL_QUERY(id) }),
  });

  const data = await response.json();

  const evolutions =
    data.data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
      .pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies;

  const { name, height, weight } = data.data.pokemon_v2_pokemon[0];

  const abilities =
    data.data.pokemon_v2_pokemon[0].pokemon_v2_pokemonabilities.map(
      (param: any) => param.pokemon_v2_ability.name
    );

  const types = data.data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.map(
    (param: any) => param.pokemon_v2_type.name
  );

  const image = JSON.parse(
    data.data.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites
  ).front_default;

  return {
    evolutions,
    name,
    height,
    weight,
    abilities,
    types,
    image,
  } as PokemonDetail;
};
