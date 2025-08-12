import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PaginationPayload,
  PaginationResponse,
} from "../../../shared/models/pagination.interface";
import { PokemonListItem } from "../models/pokemon-list.interface";
import { PokemonDetails } from "../models/pokemon-details.interface";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { store } from "../../../store/store";
import { setRequestMeta } from "../slices/pokemon-slice";

export const pokemonListAdapter = createEntityAdapter<PokemonListItem, string>({
  selectId: (pokemon) => pokemon.name,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const initialPokemonListState: EntityState<PokemonListItem, string> =
  pokemonListAdapter.getInitialState();

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URL }),
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
        // store.dispatch(
        //   setRequestMeta({
        //     count: responseData.count,
        //     next: responseData.next,
        //     previous: responseData.previous,
        //   })
        // );
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
