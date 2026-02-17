import React from 'react'
import News from './components/News'
import Blogs from './components/Blogs'
import { useState } from 'react';

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  }

  const handleShowNews = () => {
    setShowNews(true);
    setShowBlogs(false);
  }


  return (
    <div className='container'>
      <div className="news-blogs-app">
        {showNews && <News onShowBlogs={handleShowBlogs} />}
        {showBlogs && <Blogs onBack={handleShowNews} />}
      </div>
    </div>
  )
}

export default App