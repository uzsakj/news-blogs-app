import React from 'react'
import News from './components/News'
import Blogs from './components/Blogs'
import { useState } from 'react';

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState(() => {
    const savedBlogs = localStorage.getItem('blogs');
    return savedBlogs ? JSON.parse(savedBlogs) : [];
  });

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  const handleCreateBlog = (newBlog, isEditing) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEditing ? prevBlogs.map(blog => blog === selectedBlog ? newBlog : blog) : [...prevBlogs, newBlog];
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
    setIsEditing(false);
    setSelectedBlog(null);
  }

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  }

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter(blog => blog !== blogToDelete);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  }

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  }

  const handleShowNews = () => {
    setShowNews(true);
    setShowBlogs(false);
    setIsEditing(false);
    setSelectedBlog(null);
  }


  return (
    <div className='container'>
      <div className="news-blogs-app">
        {showNews &&
          <News
            onShowBlogs={handleShowBlogs}
            blogs={blogs}
            onEditBlog={handleEditBlog}
            selectedBlog={selectedBlog}
            setSelectedBlog={setSelectedBlog}
            onDeleteBlog={handleDeleteBlog}
          />}
        {showBlogs &&
          <Blogs
            key={selectedBlog ? 'edit' : 'create'}
            onBack={handleShowNews}
            onCreateBlog={handleCreateBlog}
            editBlog={selectedBlog}
            isEditing={isEditing}
          />}
      </div>
    </div>
  )
}

export default App