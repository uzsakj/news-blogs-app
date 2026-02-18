import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import News from './components/News'
import Blogs from './components/Blogs'
import { startEditBlog, clearSelectedBlog } from './store/blogSlice'

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const dispatch = useDispatch();
  const selectedBlog = useSelector((state) => state.blogs.selectedBlog);

  const handleEditBlog = (blog) => {
    dispatch(startEditBlog(blog));
    setShowNews(false);
    setShowBlogs(true);
  }

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  }

  const handleShowNews = () => {
    setShowNews(true);
    setShowBlogs(false);
    dispatch(clearSelectedBlog());
  }

  return (
    <div className='container'>
      <div className="news-blogs-app">
        {showNews &&
          <News
            onShowBlogs={handleShowBlogs}
            onEditBlog={handleEditBlog}
          />}
        {showBlogs &&
          <Blogs
            key={selectedBlog ? 'edit' : 'create'}
            onBack={handleShowNews}
          />}
      </div>
    </div>
  )
}

export default App