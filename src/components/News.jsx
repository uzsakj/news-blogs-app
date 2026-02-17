import React from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './News.css'
import userImg from '../assets/images/user.jpg'
import noImage from '../assets/images/no-img.png'
import axios from 'axios'
import { useState, useEffect } from 'react';

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

    useEffect(() => {
        const fetchNews = async () => {
            const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`;
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
    }, [selectedCategory]);

    const handleCategoryChange = (e, category) => {
        e.preventDefault();
        setSelectedCategory(category);
    }

    return (
        <div className='news'>
            <header className='news-header'>
                <h1 className='logo'>News & Blogs</h1>
                <div className="search-bar">
                    <form>
                        <input type="text" placeholder='Search News...' />
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
                                <a href="" className='nav-link' key={category} onClick={(e) => handleCategoryChange(e, category)}> {category}</a>
                            ))}
                            <a href="" className='nav-link'> Bookmarks <i className="fa-regular fa-bookmark"></i></a>
                        </div>
                    </nav>
                </div>
                <div className="news-section">
                    {headline && (
                        <div className="headline">
                            <img src={headline?.image} alt={headline?.title} />
                            <h2 className='headline-title'>
                                {headline?.title}
                                <i className="fa-regular fa-bookmark bookmark"></i>
                            </h2>
                        </div>
                    )}
                    <div className="news-grid">
                        {news.map((article, index) => (
                            <div className="news-grid-item" key={index}>
                                <img src={article.image || noImage} alt={article.title} />
                                <h3>{article.title}</h3>
                                <i className="fa-regular fa-bookmark bookmark"></i>
                            </div>
                        ))}

                    </div>
                </div>
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