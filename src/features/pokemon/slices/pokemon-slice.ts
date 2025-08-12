import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Pagination } from "../../../shared/models/pagination.interface";
import { RootState } from "../../../store/store";

type stateType = {
  requestPagination: Pagination;
};

const initialState: stateType = {
  requestPagination: { count: 0 },
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setRequestMeta: (state, action : PayloadAction<Pagination>) => {
      state.requestPagination = action.payload;
    },
  },
});

export const { setRequestMeta } = pokemonSlice.actions;
export const selectRequestPagination = (state: RootState) =>
  state.pokemon.requestPagination;
export default pokemonSlice.reducer;
