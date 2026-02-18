# News & Blogs App

A portfolio project combining a news reader with a personal blog. Browse headlines by category or search, save articles to bookmarks, and manage your own blog posts.

## Features

- News feed with category filtering and search, powered by GNews API
- RTK Query for data fetching and caching to reduce API calls
- Personal blog with create, edit, and delete
- Bookmark news articles for later
- Weather widget and calendar
- State persisted with Redux Persist so your data survives refresh

## Tech Stack

- React 19
- Vite
- Redux Toolkit with RTK Query
- Redux Persist

## Setup

Create a `.env` file with:

```
VITE_GNEWS_API_KEY=your_gnews_key
VITE_WEATHER_API_KEY=your_weather_key
```

Run `npm install` and `npm run dev` to start locally.
