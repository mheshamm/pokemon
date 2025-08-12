import { Link, NavLink, useParams } from "react-router-dom";
import { PokemonListItem } from "../models/pokemon-list.interface";
import { useGetPokemonDetailsQuery } from "../api/pokemon-api-slice";
import LoadingSpinner from "../../../shared/components/LoadingSpinnet";

type Iprops = {};

const PokemonDetailsCard: React.FC<Iprops> = () => {
  const { item } = useParams();
  const { data, error, isLoading , isFetching } = useGetPokemonDetailsQuery(item || "", {
    skip: !item,
  });

  return (
    <section className="card-details-section loading-container-wrapper">
        {isFetching && <LoadingSpinner/>}
      <div className="list-header">
        <span>{data?.name}</span>
      </div>
      <div className="card-details">
          <img src={data?.sprites.front_default || ""} alt={data?.name} />
        <div className="card-details-item">
          <p>name</p>
          <p>{data?.name}</p>
        </div>
        <div className="card-details-item">
          <p>Height</p>
          <p>{data?.height}</p>
        </div>
        <div className="card-details-item">
          <p>Weight</p>
          <p>{data?.weight}</p>
        </div>
      </div>
    </section>
  );
};

export default PokemonDetailsCard;
