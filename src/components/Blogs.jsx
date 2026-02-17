import React from 'react'
import userImg from '../assets/images/user.jpg'
import './Blogs.css'
import { useState } from 'react';

const Blogs = ({ onBack }) => {

    const [showForm, setShowForm] = useState(false);

    return (
        <div className='blogs'>
            <div className='blogs-left'>
                <img src={userImg} alt="User Image" />
                <p>Mary's Blog</p>
            </div>
            <div className="blogs-right">
                {showForm ? (<div className="blogs-right-form">
                    <h1>New Post</h1>
                    <form>
                        <div className="img-upload">
                            <label htmlFor="file-upload" className='file-upload'>
                                <i className="bx bx-upload"></i>Upload Image
                            </label>
                            <input type="file" id="file-upload" className='file-input' />
                        </div>
                        <input type="text" placeholder='Add Title (Max 60 Characters)' className='title-input' />
                        <textarea placeholder='Add Text' className='text-input' ></textarea>
                        <button type="submit" className='submit-btn'>Submit Button</button>
                    </form>
                </div>) : (
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