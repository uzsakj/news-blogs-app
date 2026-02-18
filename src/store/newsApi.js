import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gnews.io/api/v4/' }),
  keepUnusedDataFor: 300, // 5 minutes cache
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ category, searchQuery, apiKey }) => {
        if (searchQuery) {
          return {
            url: 'search',
            params: { q: searchQuery, apikey: apiKey },
          };
        }
        return {
          url: 'top-headlines',
          params: { category, lang: 'en', apikey: apiKey },
        };
      },
      transformResponse: (response, meta, arg) => {
        const articles = response?.articles ?? [];
        const fallbackImage = arg.noImage || '';
        return articles.map((article) => ({
          ...article,
          image: article.image || fallbackImage,
        }));
      },
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
