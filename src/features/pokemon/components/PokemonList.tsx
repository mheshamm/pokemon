import { useState } from "react";
import Pagination from "../../../shared/components/Pagination";
import { useGetPokemonListQuery } from "../api/pokemon-api-slice";
import PokemonListCard from "./ItemCard";
import LoadingSpinner from "../../../shared/components/LoadingSpinnet";
import { useAppSelector } from "../../../store/hooks/storeHooks";
import { selectRequestPagination } from "../slices/pokemon-slice";

type Iprops = {};

const PokemonList: React.FC<Iprops> = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const paginate = (pageNumber: number) => setPage(pageNumber);
  const { data, isFetching } = useGetPokemonListQuery(
    { offset: page * limit - limit, limit: limit },
    { refetchOnMountOrArgChange: true }
  );
  const requestMeta = useAppSelector(selectRequestPagination);
  return (
    <div className="pokemon-list-wrapper">
      {isFetching && <LoadingSpinner />}
      <ul className="pokemon-list">
        {data?.data?.ids?.map((item: string) => (
          <li key={item}>
            <PokemonListCard item={data?.data.entities[item]} />
          </li>
        ))}
      </ul>

      <div className="pagination-wrapper">
        <Pagination
          itemsPerPage={limit}
          totalItems={requestMeta.count}
          currentPage={page}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default PokemonList;
