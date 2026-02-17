import React from 'react'
import './NewsModal.css'
import './Modal.css'

const NewsModal = ({ showModal, article, onClose }) => {
    if (!showModal) {
        return null
    }
    return (
        <div className='modal-overlay'>
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
                {article && (
                    <>
                        <img src={article.image} alt={article.title} className="modal-image" />
                        <h2 className="modal-title">{article.title}</h2>
                        <p className="modal-source">Source: {article.source.name}</p>
                        <p className="modal-date">Date: {new Date(article.publishedAt).
                            toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}</p>
                        <p className="modal-content-text">{article.content}</p>
                        <a
                            href={article.url}
                            className="read-more-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Read More</a>
                    </>
                )}

            </div>
        </div>
    )
}

export default NewsModal