import React, { Dispatch, useState } from "react";
import { fetchPokemon, fetchPokemones } from "../api/pokemon";
import { Pokemon, PokemonDetail } from "../interfaces";

interface StateContextType {
  pokemonListState: Pokemon[];
  pokemonDetailState: PokemonDetail | null;
  cleanPokemonDetail: VoidFunction;
  orderPokemonList: (param: string) => void;
  fliterPokemonByName: (param: string) => void;
  fetchPokemonDetail: (param: string) => void;
  fetchPokemonList: (name: string | null, orderBy: string | null) => void;
}

const StateContext = React.createContext<StateContextType>(null!);

export function useAppState() {
  return React.useContext(StateContext);
}

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [pokemonListState, setPokemonListState] = useState<Pokemon[]>([]);
  const [orderState, setOrderState] = useState("id: asc");
  const [filterByNameState, setFilterByNameState] = useState("");
  const [pokemonDetailState, setPokemonDetailState] =
    useState<PokemonDetail | null>(null);

  const fetchPokemonList = async (
    searchName: string | null,
    orderBy: string | null
  ) => {
    const name =
      typeof searchName === "string" ? searchName : filterByNameState;
    const order = orderBy ? orderBy : orderState;
    const data = await fetchPokemones({ name, order });
    setPokemonListState(data);
  };

  const orderPokemonList = (param: string) => {
    setOrderState(param);
    fetchPokemonList(null, param);
  };

  const fliterPokemonByName = (param: string) => {
    setFilterByNameState(param);
    fetchPokemonList(param, null);
  };

  const fetchPokemonDetail = async (param: string) => {
    const data = await fetchPokemon(param);
    setPokemonDetailState(data);
  };

  const cleanPokemonDetail = () => {
    setPokemonDetailState(null)
  };

  const value = {
    pokemonListState,
    pokemonDetailState,
    fetchPokemonDetail,
    cleanPokemonDetail,
    fetchPokemonList,
    orderPokemonList,
    fliterPokemonByName,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
