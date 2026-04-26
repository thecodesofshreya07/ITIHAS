import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import "./ProfilePage.css";

import html2pdf from "html2pdf.js";

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
  const filteredProgress = (progress || []).filter(
    (quiz) => quiz.source === "main"
  );
  const quizzes = filteredProgress;

  const downloadPDF = (quiz) => {
    const element = document.createElement("div");
    element.innerHTML = `
      <div style="padding: 40px; background-color: #fff; color: #000; font-family: Arial, sans-serif;">
        <h1 style="text-align: center; font-weight: bold; font-size: 28px; margin-bottom: 20px;">HISTORICAL QUIZ REPORT</h1>
        <hr />
        <p style="margin-top: 20px; font-size: 18px;"><strong>Name:</strong> ${user.name}</p>
        <p style="font-size: 18px;"><strong>Quiz:</strong> ${quiz.title}</p>
        <p style="font-size: 18px;"><strong>Score:</strong> ${quiz.score}/${quiz.total}</p>
        <hr style="margin-top: 20px; margin-bottom: 20px;" />
        
        <h3 style="font-weight: bold; font-size: 20px;">QUESTIONS</h3>
        ${quiz.questions ? quiz.questions.map((q, j) => {
      const isCorrect =
        (q.selectedAnswer || '').trim() === (q.correctAnswer || '').trim();

      return `
    <div style="margin-top: 20px; margin-bottom: 20px;">
      <p style="font-weight: bold; font-size: 16px;">Q${j + 1}: ${q.question}</p>
      <p style="margin-top: 10px; font-size: 16px;">
        Your Answer: ${q.selectedAnswer} 
        <span style="color: ${isCorrect ? 'green' : 'red'}; margin-left: 5px; font-weight: bold;">
          ${isCorrect ? '✔' : '✘'}
        </span>
      </p>
      <p style="margin-top: 5px; font-size: 16px;">Correct Answer: ${q.correctAnswer}</p>
      <div style="margin-top: 10px; padding-left: 15px; border-left: 3px solid #34495e;">
        <p style="font-size: 14px; font-style: italic; color: #555; margin: 0;">
          <strong>Explanation:</strong><br/>
          ${q.explanation || 'Explanation not available'}
        </p>
      </div>
    </div>
  `;
    }).join('') : '<p>No question data available for this quiz.</p>'}
        <hr style="margin-top: 30px; margin-bottom: 30px;" />
      </div>
    `;

    const opt = {
      margin: 0.5,
      filename: `${quiz.title.replace(/\s+/g, '_')}_Report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

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

        <div id="progress-section" className="progress-section">
          <h2>Quiz History</h2>
          {quizzes.length === 0 ? (
            <p className="no-data">No quizzes completed yet. Start your first journey in the Quiz section!</p>
          ) : (
            <div className="quiz-list">
              {quizzes.map((q, i) => (
                <div key={i} className="quiz-history-item" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="quiz-info">
                      <h4>{q.title}</h4>
                      <span>{new Date(q.date).toLocaleDateString()}</span>
                    </div>
                    <div className="quiz-result">
                      <span className="quiz-score">{q.score} / {q.total}</span>
                      <span className="quiz-time">{Math.floor(q.time / 60)}:{(q.time % 60).toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                  <button onClick={() => downloadPDF(q)} style={{ marginTop: '15px', alignSelf: 'flex-start', padding: '6px 14px', background: 'transparent', color: 'var(--gold)', border: '1px solid var(--gold)', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.3s ease' }}>
                    Download Report
                  </button>
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
                    className={`star ${(hoverRating || rating) >= star ? 'active' : ''}`}
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
