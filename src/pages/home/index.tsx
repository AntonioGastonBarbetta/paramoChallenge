import { Link, Pagination, PaginationItem } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import SearchAndFilter from "../../components/searchAndFilter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./index.scss";
import { useAppState } from "../../store";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  const [paginationCount, setPaginationCount] = useState(0);
  const [page, setPage] = useState(1);
  const {
    pokemonListState,
    fetchPokemonList,
    fetchPokemonDetail,
    cleanPokemonDetail,
  } = useAppState();

  const perPage = 50;

  useEffect(() => {
    fetchPokemonList( null, null );
    cleanPokemonDetail();
  }, []);

  useEffect(() => {
    if (pokemonListState) {
      setPaginationCount(Math.ceil(pokemonListState.length / perPage));
      setPage(1);
    }
  }, [pokemonListState]);

  const handlePagination = (e: ChangeEvent<unknown>, p: number) => {
    setPage(p);
  };

  const handleFetchPokemonDetail = (id: string) => {
    fetchPokemonDetail(id);
  };

  return (
    <>
      <SearchAndFilter />
      <section className="content">
        {pokemonListState &&
          pokemonListState.map((pokemon: any, i: number) =>
            (page - 1) * perPage <= i && i < (page - 1) * perPage + perPage ? (
              <Link
                component={RouterLink}
                to={`/${pokemon.id}`}
                onClick={() => {
                  handleFetchPokemonDetail(pokemon.id);
                }}
              >
                {pokemon.id}-{pokemon.name}
              </Link>
            ) : null
          )}
      </section>
      <Pagination
        className="pagination"
        count={paginationCount}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handlePagination}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </>
  );
};

export default Home;
