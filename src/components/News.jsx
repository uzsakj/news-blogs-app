import React from 'react'
import { useState, useEffect } from 'react';
import './News.css'
import userImg from '../assets/images/user.jpg'
import noImage from '../assets/images/no-img.png'
import axios from 'axios'
import Weather from './Weather'
import Calendar from './Calendar'
import NewsModal from './NewsModal'

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

const News = () => {
    const [headline, setHeadline] = useState(null);
    const [news, setNews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);



    useEffect(() => {
        const fetchNews = async () => {
            let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`;

            if (searchQuery) {
                url = `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`;
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
                    <div className="user">
                        <img src={userImg} alt="User Image" />
                        <p>Mary's Blog</p>
                    </div>
                    <nav className="categories">
                        <h1 className='nav-heading'>Categories</h1>
                        <div className="nav-linnks">
                            {categories.map((category) => (
                                <a
                                    href=""
                                    className='nav-link'
                                    key={category}
                                    onClick={(e) => handleCategoryChange(e, category)}>
                                    {category}
                                </a>
                            ))}
                            <a href="" className='nav-link'> Bookmarks <i className="fa-regular fa-bookmark"></i></a>
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
                                <i className="fa-regular fa-bookmark bookmark"></i>
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
                                <i className="fa-regular fa-bookmark bookmark"></i>
                            </div>
                        ))}

                    </div>
                </div>
                <NewsModal
                    showModal={showModal}
                    article={selectedArticle}
                    onClose={() => setShowModal(false)}
                />
                <div className="my-blogs">My Blogs</div>
                <div className="weather-calendar">
                    <Weather />
                    <Calendar />
                </div>
            </div>
            <footer className='news-footer'> News Footer</footer>
        </div>
    )
}

export default News