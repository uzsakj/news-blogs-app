import React from 'react'
import News from './components/News'
import Blogs from './components/Blogs'
import { useState } from 'react';

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const handleCreateBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  }

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
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} />}
        {showBlogs && <Blogs onBack={handleShowNews} onCreateBlog={handleCreateBlog} />}
      </div>
    </div>
  )
}

export default App