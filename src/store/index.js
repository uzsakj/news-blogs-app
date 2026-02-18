import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import blogReducer from './blogSlice';
import newsReducer from './newsSlice';
import bookmarksReducer from './bookmarksSlice';
import { newsApi } from './newsApi';

const rootReducer = combineReducers({
  blogs: blogReducer,
  news: newsReducer,
  bookmarks: bookmarksReducer,
  [newsApi.reducerPath]: newsApi.reducer,
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
      selectedCategory: state.news.selectedCategory,
      searchQuery: state.news.searchQuery,
      searchInput: '', // Reset on refresh - searchQuery holds the committed search
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
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: [newsApi.reducerPath],
      },
    }).concat(newsApi.middleware),
});

export const persistor = persistStore(store);
