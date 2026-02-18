import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import blogReducer from './blogSlice';
import newsReducer from './newsSlice';
import bookmarksReducer from './bookmarksSlice';

const rootReducer = combineReducers({
  blogs: blogReducer,
  news: newsReducer,
  bookmarks: bookmarksReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  partialize: (state) => ({
    blogs: {
      ...state.blogs,
      selectedBlog: null,
      isEditing: false,
      showBlogsModal: false,
    },
    news: {
      cache: state.news.cache,
      selectedCategory: state.news.selectedCategory,
      searchQuery: state.news.searchQuery,
      headline: null,
      news: [],
      loading: false,
      error: null,
    },
    bookmarks: {
      bookmarks: state.bookmarks.bookmarks,
      showBookmarksModal: false,
    },
  }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'news/fetchNews/fulfilled',
          'news/fetchNews/rejected',
        ],
      },
    }),
});

export const persistor = persistStore(store);
