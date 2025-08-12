import { useGetPokemonListQuery } from "../api/pokemon-api-slice";
import PokemonListCard from "./ItemCard";

type Iprops = {
};

const PokemonList: React.FC<Iprops> = () => {
  const { data, error, isLoading } = useGetPokemonListQuery({ limit: 40 });
  return (
    <ul className="pokemon-list">
      {data?.ids?.map((item: string) => (
        <li key={item}>
          <PokemonListCard item={data.entities[item]} />
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
