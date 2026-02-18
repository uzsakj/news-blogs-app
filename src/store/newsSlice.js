import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const getCacheKey = (category, searchQuery) =>
  searchQuery ? `search:${searchQuery}` : `category:${category}`;

const isCacheValid = (cachedAt) =>
  cachedAt && Date.now() - cachedAt < CACHE_TTL_MS;

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category, searchQuery, apiKey, noImage }, { getState }) => {
    const cacheKey = getCacheKey(category, searchQuery);
    const cached = getState().news.cache[cacheKey];

    if (cached && isCacheValid(cached.fetchedAt)) {
      return { articles: cached.articles, fromCache: true };
    }

    let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${apiKey}`;
    if (searchQuery) {
      url = `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=${apiKey}`;
    }

    const response = await axios.get(url);
    const articles = response.data?.articles ?? [];

    const fallbackImage = noImage || '';
    articles.forEach((article) => {
      if (!article.image) article.image = fallbackImage;
    });

    return { articles, fromCache: false, cacheKey };
  }
);

const initialState = {
  headline: null,
  news: [],
  selectedCategory: 'general',
  searchQuery: '',
  searchInput: '',
  cache: {},
  loading: false,
  error: null,
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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { articles, fromCache, cacheKey } = action.payload;
        state.headline = articles[0] ?? null;
        state.news = articles.slice(1, 7);

        if (!fromCache && cacheKey) {
          state.cache[cacheKey] = {
            articles,
            fetchedAt: Date.now(),
          };
        }
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Failed to fetch news';
        state.headline = null;
        state.news = [];
      });
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  setSearchInput,
  clearSearchInput,
  clearError,
} = newsSlice.actions;

export default newsSlice.reducer;
