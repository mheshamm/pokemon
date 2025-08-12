import { Outlet } from "react-router-dom";
import PokemonList from "./PokemonList";

type Iprops = {};

const PokemonLayout: React.FC<Iprops> = () => {
  return (
    <section className="section-grid">
      <div className="section-left">
        <div className="list-header">
            <span>Pokemon List</span>
        </div>
        <PokemonList />
      </div>

      <div className="section-right">
        <Outlet />
      </div>
    </section>
  );
};

export default PokemonLayout;
