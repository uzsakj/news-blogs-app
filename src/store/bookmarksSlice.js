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
      const match = (b) =>
        (b.url && article.url ? b.url === article.url : b.title === article.title);
      const index = state.bookmarks.findIndex(match);
      if (index !== -1) {
        state.bookmarks.splice(index, 1);
      } else {
        state.bookmarks.push(article);
      }
    },
    removeBookmark: (state, action) => {
      const article = action.payload;
      const match = (b) =>
        (b.url && article.url ? b.url === article.url : b.title === article.title);
      const index = state.bookmarks.findIndex(match);
      if (index !== -1) {
        state.bookmarks.splice(index, 1);
      }
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
