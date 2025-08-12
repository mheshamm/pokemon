import { Link, NavLink } from "react-router-dom";
import { PokemonListItem } from "../models/pokemon-list.interface";

type Iprops = {
  item: PokemonListItem;
};

const PokemonListCard: React.FC<Iprops> = ({ item }) => {
  const extractPokemonIdAsNumber = (url: string): string => {
    const match = url.match(/\/pokemon\/(\d+)\/?$/);
    return match ? match[1] : "";
  };
  

  return (
    <NavLink
      className={({ isActive }) => (isActive ? "is-active" : "")}
      to={extractPokemonIdAsNumber(item.url)}
    >
      <div className="pokemon-item">
        <h5>{item.name}</h5>
      </div>
    </NavLink>
  );
};

export default PokemonListCard;
