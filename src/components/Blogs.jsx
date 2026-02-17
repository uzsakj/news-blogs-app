import React from 'react'
import { useState } from 'react';
import './Blogs.css'
import userImg from '../assets/images/user.jpg'
import noImage from '../assets/images/no-img.png'

const Blogs = ({ onBack, onCreateBlog }) => {

    const [showForm, setShowForm] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBlog = {
            image: image || noImage,
            title,
            content
        }
        onCreateBlog(newBlog);
        setImage(null);
        setTitle('');
        setContent('');
        setShowForm(false);
    }
    return (
        <div className='blogs'>
            <div className='blogs-left'>
                <img src={userImg} alt="User Image" />
                <p>Mary's Blog</p>
            </div>
            <div className="blogs-right">
                {showForm ? (
                    <div className="blogs-right-form">
                        <h1>New Post</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="img-upload">
                                <label htmlFor="file-upload" className='file-upload'>
                                    <i className="bx bx-upload"></i>Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className='file-input'
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder='Add Title (Max 60 Characters)'
                                className='title-input'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                maxLength={60}
                            />
                            <textarea
                                placeholder='Add Text'
                                className='text-input'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                            <button type="submit" className='submit-btn'>Submit Button</button>
                        </form>
                    </div>
                ) : (
                    <button className="post-btn" onClick={() => setShowForm(true)}>Create New Post</button>
                )}

                <button className="blogs-close-btn" onClick={onBack}>
                    Back <i className="bx bx-chevron-right"></i>
                </button>
            </div>
        </div>
    )
}

export default Blogs