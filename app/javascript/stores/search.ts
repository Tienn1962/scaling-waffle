import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

export interface SearchState {
  filters: string[];
  page: number;
}

const initialState = { filters: [], page: 0 } as SearchState;

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addFilter(state, action: PayloadAction<string>) {
      if (state.filters.includes(action.payload)) {
        return;
      }

      state.filters = [...state.filters, action.payload];
      state.page = 0;
    },

    removeFilter(state, action: PayloadAction<string>) {
      state.filters = [...state.filters.filter((f) => f !== action.payload)];
      state.page = 0;
    },

    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { addFilter, removeFilter, setPage } = searchSlice.actions;
export default searchSlice;
export const store = configureStore({
  reducer: searchSlice.reducer,
});
