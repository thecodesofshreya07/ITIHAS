import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user } = useAuth();

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
      </div>
    </div>
  );
}
