import React from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './News.css'

const News = () => {
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
                    <div className="user">User</div>
                    <nav className="categories">Categories</nav>
                </div>
                <div className="news-section">
                    <div className="headline">HeadLine</div>
                    <div className="news-grid">News Grid</div>
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