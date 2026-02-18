import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './News.css'
import userImg from '../assets/images/user.jpg'
import noImage from '../assets/images/no-img.png'
import Weather from './Weather'
import Calendar from './Calendar'
import NewsModal from './NewsModal'
import Bookmarks from './Bookmarks'
import BlogsModal from './BlogsModal'
import { showBlogModal, deleteBlog } from '../store/blogSlice'
import {
  setSelectedCategory,
  setSearchQuery,
  setSearchInput,
  clearSearchInput,
} from '../store/newsSlice'
import { useGetNewsQuery } from '../store/newsApi'
import {
  toggleBookmark,
  showBookmarksModal as openBookmarksModal,
  hideBookmarksModal,
} from '../store/bookmarksSlice'

const categories = [
    'general',
    'world',
    'business',
    'technology',
    'entertainment',
    'sports',
    'science',
    'health',
    'nation'
];

const News = ({ onShowBlogs, onEditBlog }) => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.blogs);
    const showBlogsModal = useSelector((state) => state.blogs.showBlogsModal);
    const selectedCategory = useSelector((state) => state.news.selectedCategory);
    const searchInput = useSelector((state) => state.news.searchInput);
    const searchQuery = useSelector((state) => state.news.searchQuery);
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

    const { data: articles = [], isLoading: loading, isError, error } = useGetNewsQuery(
        { category: selectedCategory, searchQuery, apiKey, noImage },
        { skip: !apiKey }
    );

    const headline = articles[0] ?? null;
    const news = articles.slice(1, 7);

    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
    const showBookmarksModal = useSelector((state) => state.bookmarks.showBookmarksModal);

    const handleCategoryChange = (e, category) => {
        e.preventDefault();
        dispatch(setSelectedCategory(category));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchQuery(searchInput));
        dispatch(clearSearchInput());
    };

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
    }

    const handleBookmarkClick = (article) => {
        dispatch(toggleBookmark(article));
    };


    const handleBlogClick = (blog) => {
        dispatch(showBlogModal(blog));
    };

    const isBookmarked = (article) =>
        bookmarks.some((b) =>
            (b.url && article.url ? b.url === article.url : b.title === article.title)
        );

    return (
        <div className='news'>
            <header className='news-header'>
                <h1 className='logo'>News & Blogs</h1>
                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder='Search News...'
                            value={searchInput}
                            onChange={(e) => dispatch(setSearchInput(e.target.value))} />
                        <button type='submit'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </header>
            <div className="news-content">
                <div className='navbar'>
                    <div className="user" onClick={onShowBlogs}>
                        <img src={userImg} alt="User Image" />
                        <p>Mary's Blog</p>
                    </div>
                    <nav className="categories">
                        <h1 className='nav-heading'>Categories</h1>
                        <div className="nav-links">
                            {categories.map((category) => (
                                <a
                                    href="#"
                                    className='nav-link'
                                    key={category}
                                    onClick={(e) => handleCategoryChange(e, category)}>
                                    {category}
                                </a>
                            ))}
                            <a
                                href="#"
                                className='nav-link'
                                onClick={() => dispatch(openBookmarksModal())}>
                                Bookmarks <i className="fa-solid fa-bookmark"></i>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="news-section">
                    {loading && (
                        <div className="news-loading">Loading news...</div>
                    )}
                    {isError && (
                        <div className="news-error">{error?.error ?? error?.data?.message ?? 'Failed to fetch news'}</div>
                    )}
                    {!loading && !isError && headline && (
                        <div
                            className="headline"
                            onClick={() => handleArticleClick(headline)}
                        >
                            <img src={headline?.image} alt={headline?.title} />
                            <h2 className='headline-title'>
                                {headline?.title}
                                <i
                                    className={`${isBookmarked(headline)
                                        ? 'fa-solid'
                                        : 'fa-regular'
                                        } fa-bookmark bookmark`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleBookmarkClick(headline);
                                    }}>
                                </i>
                            </h2>
                        </div>
                    )}
                    <div className="news-grid">
                        {!loading && !isError && news.map((article, index) => (
                            <div
                                className="news-grid-item"
                                key={article.url ?? article.title ?? index}
                                onClick={() => handleArticleClick(article)}
                            >
                                <img src={article.image || noImage} alt={article.title} />
                                <h3>{article.title}</h3>
                                <i
                                    className={`${isBookmarked(article)
                                        ? 'fa-solid'
                                        : 'fa-regular'
                                        } fa-bookmark bookmark`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleBookmarkClick(article);
                                    }}>
                                </i>
                            </div>
                        ))}

                    </div>
                </div>
                <NewsModal
                    showModal={showModal}
                    article={selectedArticle}
                    onClose={() => setShowModal(false)}
                />
                <Bookmarks
                    show={showBookmarksModal}
                    onClose={() => dispatch(hideBookmarksModal())}
                    onSelectArticle={handleArticleClick}
                />
                <div className="my-blogs">
                    <h1 className="my-blogs-heading">My Blogs</h1>
                    <div className="blog-posts">
                        {blogs.map((blog) => (
                            <div
                                className="blog-post"
                                key={blog.id}
                                onClick={() => handleBlogClick(blog)}>
                                <img src={blog.image || noImage} alt="Post Image" />
                                <h3>{blog.title}</h3>
                                <div className="post-buttons">
                                    <button
                                        className="edit-post"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEditBlog(blog);
                                        }}>
                                        <i className="bx bxs-edit"></i>
                                    </button>
                                    <button
                                        className="delete-post"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(deleteBlog(blog));
                                        }}>
                                        <i className="bx bxs-x-circle"></i>
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                    {showBlogsModal && <BlogsModal />}
                </div>
                <div className="weather-calendar">
                    <Weather />
                    <Calendar />
                </div>
            </div>
            <footer className='news-footer'>
                <p>
                    <span> News & Blogs App</span>
                </p>
                <p>
                    &copy; All rights reserved. By József Uzsák - 2026
                </p>
            </footer>
        </div>
    )
}

export default News