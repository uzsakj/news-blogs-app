import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarks: [],
  showBookmarksModal: false,
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const article = action.payload;
      const existing = state.bookmarks.find((b) => b.title === article.title);
      if (existing) {
        state.bookmarks = state.bookmarks.filter((b) => b.title !== article.title);
      } else {
        state.bookmarks.push(article);
      }
    },
    removeBookmark: (state, action) => {
      const article = action.payload;
      state.bookmarks = state.bookmarks.filter((b) => b.title !== article.title);
    },
    showBookmarksModal: (state) => {
      state.showBookmarksModal = true;
    },
    hideBookmarksModal: (state) => {
      state.showBookmarksModal = false;
    },
  },
});

export const {
  toggleBookmark,
  removeBookmark,
  showBookmarksModal,
  hideBookmarksModal,
} = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
