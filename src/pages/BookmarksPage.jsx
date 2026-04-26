import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./ProfilePage.css"; // Reusing some profile/list styles for consistency

export default function BookmarksPage() {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem("itihaas_bookmarks") || "[]");
        setBookmarks(savedBookmarks);
    }, []);

    const removeBookmark = (id) => {
        const updated = bookmarks.filter(b => b.id !== id);
        setBookmarks(updated);
        localStorage.setItem("itihaas_bookmarks", JSON.stringify(updated));
    };

    return (
        <>
            <Navbar />
            <main className="profile-page">
                <header className="profile-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1>My Bookmarks</h1>
                    <p>Your saved historical journeys</p>
                </header>

                <section className="profile-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                    {bookmarks.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
                            <p>You haven't bookmarked anything yet.</p>
                            <Link to="/stories" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.8rem 1.5rem', background: 'var(--accent)', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
                                Explore Stories
                            </Link>
                        </div>
                    ) : (
                        <div className="bookmarks-grid" style={{ display: 'grid', gap: '1.5rem' }}>
                            {bookmarks.map((item) => (
                                <div key={item.id} className="bookmark-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.title}</h3>
                                        <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>{item.description || item.shortDescription}</p>
                                        <Link to={item.type === 'timeline' ? '/timeline' : `/stories/${item.id}`} style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem', marginTop: '0.5rem', display: 'inline-block' }}>
                                            View Details →
                                        </Link>
                                    </div>
                                    <button
                                        onClick={() => removeBookmark(item.id)}
                                        style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.5rem' }}
                                        title="Remove Bookmark"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
