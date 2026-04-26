import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!user) {
    return (
      <div className="profile-page-guest">
        <Navbar />
        <div className="profile-container">
          <h2>Please login to view your progress</h2>
        </div>
      </div>
    );
  }

  const { progress } = user;
  const quizzes = progress?.quizzes || [];

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!feedback.trim() && rating === 0) return;
    
    // Simulate sending feedback
    console.log("Feedback submitted:", { feedback, rating });
    setSubmitted(true);
    setFeedback("");
    setRating(0);
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Journey</h1>
          <p>Explorer: {user.name}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Quizzes Finished</h3>
            <p className="stat-value">{quizzes.length}</p>
          </div>
          <div className="stat-card">
            <h3>Average Score</h3>
            <p className="stat-value">
              {quizzes.length > 0 
                ? Math.round((quizzes.reduce((acc, q) => acc + (q.score / q.total), 0) / quizzes.length) * 100) 
                : 0}%
            </p>
          </div>
        </div>

        <div className="progress-section">
          <h2>Quiz History</h2>
          {quizzes.length === 0 ? (
            <p className="no-data">No quizzes completed yet. Start your first journey in the Quiz section!</p>
          ) : (
            <div className="quiz-list">
              {quizzes.map((q, i) => (
                <div key={i} className="quiz-history-item">
                  <div className="quiz-info">
                    <h4>{q.title}</h4>
                    <span>{new Date(q.date).toLocaleDateString()}</span>
                  </div>
                  <div className="quiz-result">
                    <span className="quiz-score">{q.score} / {q.total}</span>
                    <span className="quiz-time">{Math.floor(q.time / 60)}:{(q.time % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="feedback-section">
          <h2>Share Your Thoughts</h2>
          <p>Help us improve ITIHAS with your feedback</p>
          
          {submitted ? (
            <div className="feedback-success">
              <div className="success-icon">✓</div>
              <p>Thank you for your feedback, Explorer!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="feedback-form">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${ (hoverRating || rating) >= star ? 'active' : '' }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What did you like? What should we add?"
                required
              />
              <button type="submit" className="feedback-submit-btn">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
