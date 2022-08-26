import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./index.scss";
import { useAppState } from "../../store";
import { ChangeEvent, useEffect, useState } from "react";

const SearchAndFilter = () => {
  const [order, setorder] = useState("");
  const [filter, setFilter] = useState("");
  const { orderPokemonList, fliterPokemonByName } = useAppState();

  useEffect(() => {
    const delayFn = setTimeout( () => {
      fliterPokemonByName(filter);
    }, 300);
    return () => clearTimeout(delayFn);
  }, [filter]);

  const handleOrderChange = (event: SelectChangeEvent) => {
    orderPokemonList(event.target.value);
    setorder(event.target.value);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    let timer;
  };

  return (
    <header className="header">
      <FormControl className="filter">
        <InputLabel>Order</InputLabel>
        <Select label="Filter" onChange={handleOrderChange} value={order}>
          <MenuItem value={"id: asc"}>Lowest Number</MenuItem>
          <MenuItem value={"id: desc"}>Highest number</MenuItem>
          <MenuItem value={"name: asc"}>A-Z</MenuItem>
          <MenuItem value={"name: desc"}>Z-A</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth className="search">
        <InputLabel>Search</InputLabel>
        <OutlinedInput
          value={filter}
          onChange={handleFilterChange}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          label="Search"
        />
      </FormControl>
    </header>
  );
};

export default SearchAndFilter;
