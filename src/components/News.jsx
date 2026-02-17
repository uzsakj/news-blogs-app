import React from 'react'
import { useState, useEffect } from 'react';
import './News.css'
import userImg from '../assets/images/user.jpg'
import noImage from '../assets/images/no-img.png'
import axios from 'axios'
import Weather from './Weather'
import Calendar from './Calendar'
import NewsModal from './NewsModal'
import Bookmarks from './Bookmarks'

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

const News = ({ onShowBlogs }) => {
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;


    const [headline, setHeadline] = useState(null);
    const [news, setNews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [showBookmarksModal, setShowBookmarksModal] = useState(false);



    useEffect(() => {
        const fetchNews = async () => {
            let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=${apiKey}`;

            if (searchQuery) {
                url = `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=${apiKey}`;
            }

            const response = await axios.get(url);
            const fetchedNews = response.data.articles;

            fetchedNews.forEach(article => {
                if (!article.image) {
                    article.image = noImage;
                }
            });

            setHeadline(fetchedNews[0]);
            setNews(fetchedNews.slice(1, 7));

            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
            if (savedBookmarks) {
                setBookmarks(savedBookmarks);
            }
        }
        fetchNews();
    }, [selectedCategory, searchQuery]);

    const handleCategoryChange = (e, category) => {
        e.preventDefault();
        setSelectedCategory(category);
    }
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        setSearchInput('');
    }

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
    }

    const handleBookmarkClick = (article) => {
        setBookmarks((prevBookmarks) => {
            const updatedBookmarks =
                prevBookmarks.find(bookmark => bookmark.title === article.title) ?
                    prevBookmarks.filter(bookmark => bookmark.title !== article.title) : [...prevBookmarks, article];

            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            return updatedBookmarks;
        });
    }


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
                            onChange={(e) => setSearchInput(e.target.value)} />
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
                        <div className="nav-linnks">
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
                                onClick={() => setShowBookmarksModal(true)}>
                                Bookmarks <i className="fa-solid fa-bookmark"></i>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="news-section">
                    {headline && (
                        <div
                            className="headline"
                            onClick={() => handleArticleClick(headline)}
                        >
                            <img src={headline?.image} alt={headline?.title} />
                            <h2 className='headline-title'>
                                {headline?.title}
                                <i
                                    className={`${bookmarks.some(bookmark => bookmark.title === headline.title)
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
                        {news.map((article, index) => (
                            <div
                                className="news-grid-item"
                                key={index}
                                onClick={() => handleArticleClick(article)}
                            >
                                <img src={article.image || noImage} alt={article.title} />
                                <h3>{article.title}</h3>
                                <i
                                    className={`${bookmarks.some(bookmark => bookmark.title === article.title)
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
                    bookmarks={bookmarks}
                    onClose={() => setShowBookmarksModal(false)}
                    onSelectArticle={handleArticleClick}
                    onDeleteBookmark={handleBookmarkClick}
                />
                <div className="my-blogs">My Blogs</div>
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