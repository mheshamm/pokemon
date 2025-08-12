import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PokemonList from "./features/pokemon/components/PokemonList";
import PokemonLayout from "./features/pokemon/components/PokemonLayout";
import PokemonListCard from "./features/pokemon/components/ItemCard";
import PokemonDetailsCard from "./features/pokemon/components/ItemDetailsCard";

export default function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="pokemon" />} />
      <Route path="/pokemon" element={<PokemonLayout />}>
        <Route
          path=":item"
          element={<PokemonDetailsCard/>}
        />
      </Route>
    </Routes>
  );
}
