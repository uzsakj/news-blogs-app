import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Bookmarks.css'
import './Modal.css'
import { removeBookmark, hideBookmarksModal } from '../store/bookmarksSlice'

const Bookmarks = ({ show, onClose, onSelectArticle }) => {
    const dispatch = useDispatch();
    const bookmarks = useSelector((state) => state.bookmarks.bookmarks);

    if (!show) {
        return null;
    }
    return (
        <div className='modal-overlay'>
            <div className="modal-content">
                <span className='close-button' onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
                <h2 className="bookmarks-heading">Bookmarked News</h2>
                <div className="bookmarks-list">
                    {bookmarks.map((bookmark) => (
                        <div
                            className="bookmark-item"
                            key={bookmark.title}
                            onClick={() => {
                                onSelectArticle(bookmark);
                                dispatch(hideBookmarksModal());
                            }}
                        >
                            <img src={bookmark.image} alt={bookmark.title} />
                            <h3>{bookmark.title}</h3>
                            <span
                                className="delete-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(removeBookmark(bookmark));
                                }}
                            >
                                <i className="fa-regular fa-circle-xmark"></i>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Bookmarks