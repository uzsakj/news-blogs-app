import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: 'general',
  searchQuery: '',
  searchInput: '',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.searchQuery = '';
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    clearSearchInput: (state) => {
      state.searchInput = '';
    },
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  setSearchInput,
  clearSearchInput,
} = newsSlice.actions;

export default newsSlice.reducer;
