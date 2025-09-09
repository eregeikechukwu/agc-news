// App state management slice
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../types/api-types";

const initialState: AppState = {
  selectedCategory: null,
  searchQuery: "",
  searchInitQuery: "",
  isBackdropVisible: false,
  isSearchOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    /**
     * Set the search query
     * @param state - Current app state
     * @param action - Action with search query payload
     */
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload || "";
    },

    /**
     * Set initial serahc query
     * @param state - Current app state
     * @param action - Action with search query payload
     */
    setSearchInitQUert: (state, action: PayloadAction<string>) => {
      state.searchInitQuery = action.payload || "";
    },

    /**
     * Clear search query
     * @param state - Current app state
     */
    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchInitQuery = "";
    },

    toggleBackdrop: (state) => {
      state.isBackdropVisible = !state.isBackdropVisible;
    },

    closeBackdrop: (state) => {
      state.isBackdropVisible = false;
    },
    openBackdrop: (state) => {
      state.isBackdropVisible = true;
    },

    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
      state.isBackdropVisible = !state.isBackdropVisible;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
  },
});

export const {
  setSearchQuery,
  clearSearch,
  closeBackdrop,
  toggleBackdrop,
  openBackdrop,
  toggleSearch,
  closeSearch,
} = appSlice.actions;
