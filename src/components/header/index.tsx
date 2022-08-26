import { AppBar, Toolbar, Typography } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import "./index.scss"

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <CatchingPokemonIcon className="icon"/>
        <Typography variant="h6" component="div">
          PokeApp
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
