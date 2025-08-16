import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import PokemonLayout from "./features/pokemon/components/PokemonLayout";
import PokemonDetailsCard from "./features/pokemon/components/ItemDetailsCard";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#3ccc65",
              color: "white",
              direction: "ltr",
            },
            iconTheme: {
              primary: "white",
              secondary: "#3ccc65",
            },
          },
          error: {
            style: {
              background: "#e3256c",
              color: "white",
              direction: "ltr",
            },
            iconTheme: {
              primary: "white",
              secondary: "#e3256c",
            },
          },
        }}
      />
      <Routes>
        <Route index element={<Navigate to="pokemon" />} />
        <Route path="/pokemon" element={<PokemonLayout />}>
          <Route path=":item" element={<PokemonDetailsCard />} />
        </Route>
      </Routes>
    </>
  );
}
