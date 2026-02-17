import React from 'react'
import './Bookmarks.css'
import './Modal.css'

const Bookmarks = ({ show, bookmarks, onClose, onSelectArticle, onDeleteBookmark }) => {
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
                        <div className="bookmark-item" key={bookmark.title} onClick={() => onSelectArticle(bookmark)}>
                            <img src={bookmark.image} alt={bookmark.title} />
                            <h3>{bookmark.title}</h3>
                            <span className="delete-button" onClick={() => onDeleteBookmark(bookmark)}>
                                <i className="fa-regular fa-circle-xmark" onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteBookmark(bookmark);
                                }}></i>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Bookmarks