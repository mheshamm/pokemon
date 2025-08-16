import { createApi } from "@reduxjs/toolkit/query/react";
import {
  PaginationPayload,
  PaginationResponse,
} from "../../../shared/models/pagination.interface";
import { PokemonListItem } from "../models/pokemon-list.interface";
import { PokemonDetails } from "../models/pokemon-details.interface";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { baseQueryWithErrorHandling } from "../../../store/api/baseQuery";

export const pokemonListAdapter = createEntityAdapter<PokemonListItem, string>({
  selectId: (pokemon) => pokemon.name,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const initialPokemonListState: EntityState<PokemonListItem, string> =
  pokemonListAdapter.getInitialState();

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      EntityState<PokemonListItem, string>,
      PaginationPayload
    >({
      query: (options) => ({
        url: "pokemon",
        params: options,
      }),

      transformResponse: (
        responseData: PaginationResponse<PokemonListItem>,
        meta,
        arg
      ) => {
        return pokemonListAdapter.setAll(
          initialPokemonListState,
          responseData.results
        );
      },
      
    }),
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (id) => `/pokemon/${id}`,
      
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
