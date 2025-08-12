import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../features/pokemon/api/pokemon-api-slice';
import pokemonSlice from '../features/pokemon/slices/pokemon-slice';

export const store = configureStore({
  reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemon : pokemonSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
