import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './BlogsModal.css'
import './Modal.css'
import { hideBlogModal } from '../store/blogSlice'

const BlogsModal = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.blogs.showBlogsModal);
    const blog = useSelector((state) => state.blogs.selectedBlog);

    if (!show || !blog) {
        return null;
    }
    return (
        <div className='modal-overlay'>
            <div className="modal-content">
                <span className="close-button" onClick={() => dispatch(hideBlogModal())}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
                {blog?.image && (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="blogs-modal-image"
                    />
                )}
                <h2 className="blogs-modal-title">{blog.title}</h2>
                <p className="blogs-post-content">{blog.content}</p>
            </div>
        </div>
    )
}

export default BlogsModal