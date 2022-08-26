import { Link, Typography } from "@mui/material";
import { useAppState } from "../../store";
import { Link as RouterLink, useParams } from "react-router-dom";
import "./index.scss";
import { useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Detail = () => {
  const { cleanPokemonDetail, fetchPokemonDetail, pokemonDetailState } =
    useAppState();
  const { id } = useParams();

  useEffect(() => {
    fetchPokemonDetail(id!);
  }, [id]);

  const handleGoBack = () => {
    cleanPokemonDetail();
  };

  return (
    <>
      <Link
        component={RouterLink}
        to={`/`}
        className="link"
        onClick={handleGoBack}
      >
        back to list
      </Link>
      {pokemonDetailState ? (
        <section className="detail-content">
          {pokemonDetailState?.image ? (
            <img
              src={pokemonDetailState?.image}
              title="pokemon-img"
              className="image"
            />
          ) : (
            <Typography
              variant="h6"
              color="textSecondary"
              component="h6"
              className="image-text"
            >
              No Available Image
            </Typography>
          )}
          <Typography variant="h4" component="h4" className="text">
            {pokemonDetailState?.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="text"
          >
            Height: {pokemonDetailState?.height}, Weight:
            {pokemonDetailState?.weight},
          </Typography>
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
            className="text"
          >
            Types:{" "}
            {pokemonDetailState?.types.map((type: string, i) =>
              i < pokemonDetailState?.types.length - 1 ? `${type}, ` : type
            )}
          </Typography>
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
            className="text"
          >
            Abilities:{" "}
            {pokemonDetailState?.abilities.map((ability: string, i) =>
              i < pokemonDetailState?.abilities.length - 1
                ? `${ability}, `
                : ability
            )}
          </Typography>
          <Typography variant="body1" component="p" className="text-evolution">
            {pokemonDetailState?.evolutions.map(
              (evolution: { name: string; id: string }, i) =>
                i < pokemonDetailState?.evolutions.length - 1 ? (
                  <>
                    <Link component={RouterLink} to={`/${evolution.id}`}>
                      {evolution.name}
                    </Link>
                    <ArrowForwardIcon className="arrow-icon" />
                  </>
                ) : (
                  <Link component={RouterLink} to={`/${evolution.id}`}>
                    {evolution.name}
                  </Link>
                )
            )}
          </Typography>
        </section>
      ) : null}
    </>
  );
};

export default Detail;
