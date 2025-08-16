import { createApi } from "@reduxjs/toolkit/query/react";
import {
  EntityWithCount,
  PaginationPayload,
  PaginationResponse,
} from "../../../shared/models/pagination.interface";
import { PokemonListItem } from "../models/pokemon-list.interface";
import { PokemonDetails } from "../models/pokemon-details.interface";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { baseQueryWithErrorHandling } from "../../../store/api/baseQuery";
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
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      EntityWithCount<PokemonListItem, string>,
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
        return {
          data: pokemonListAdapter.setAll(
            initialPokemonListState,
            responseData.results
          ),
          count: responseData.count,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.count) {
            dispatch(setRequestMeta({count : data.count || 0}));
          }
        } catch (err) {
          console.error("Failed to fetch Pokemon list metadata", err);
        }
      },
    }),
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (id) => `/pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
