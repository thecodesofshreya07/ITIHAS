import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import storiesData from "./stories.json";
import { isBookmarked, toggleBookmark } from "../../utils/bookmarkUtils";
import "./Stories.css";

// ── Icons ─────────────────────────────────────────────────────
const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LightbulbIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
  </svg>
);

const SECTION_LABELS = {
  background: "Background",
  trigger: "Trigger",
  majorEvents: "Major Events",
  consequences: "Consequences",
  globalImpact: "Global Impact",
};

const OPTION_LETTERS = ["A", "B", "C", "D"];

// ── Quiz Question ─────────────────────────────────────────────
function QuizQuestion({ item, index }) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;
  const isCorrect = selected !== null && item.options[selected] === item.correctAnswer;

  const handleSelect = (optIdx) => {
    if (!answered) setSelected(optIdx);
  };

  return (
    <div className="quiz-question-block">
      <p className="quiz-q-text">
        <strong>Q{index + 1}.</strong> {item.question}
      </p>
      <div className="quiz-options">
        {item.options.map((opt, optIdx) => {
          let cls = "quiz-option";
          if (answered) {
            if (optIdx === selected && isCorrect) cls += " correct";
            else if (optIdx === selected && !isCorrect) cls += " wrong";
            else if (opt === item.correctAnswer) cls += " revealed-correct";
            else cls += " answered";
          }
          return (
            <button
              key={optIdx}
              className={cls}
              onClick={() => handleSelect(optIdx)}
              disabled={answered}
              aria-label={`Option ${OPTION_LETTERS[optIdx]}: ${opt}`}
            >
              <span className="option-letter">{OPTION_LETTERS[optIdx]}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`quiz-feedback ${isCorrect ? "correct-fb" : "wrong-fb"}`}>
          {isCorrect
            ? "✓ Correct! Well done."
            : `✗ Not quite. The correct answer is: "${item.correctAnswer}"`}
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Stop speaking when navigating away
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [id]);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [tick, setTick] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { user, updateProgress } = useAuth();

  const handleSubmitQuiz = () => {
    const calculatedScore = story.questions.filter(
      (q, i) => selectedAnswers[i] === q.correctAnswer
    ).length;
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  const toggleSpeech = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const story = storiesData.find((s) => s.id === id);

  if (!story) {
    return (
      <div className="stories-page">
        <div className="story-detail-wrapper">
          <Link to="/stories" className="breadcrumb">
            <ArrowLeft /> Back to Archive
          </Link>
          <h2 style={{ fontFamily: "Cinzel, serif", color: "var(--gold)", marginTop: 40 }}>
            Story not found
          </h2>
          <p style={{ color: "var(--text-muted)", marginTop: 12 }}>
            This page of history has been lost to time.
          </p>
        </div>
      </div>
    );
  }

  const prevStory = story.previousEventId
    ? storiesData.find((s) => s.id === story.previousEventId)
    : null;
  const nextStory = story.nextEventId
    ? storiesData.find((s) => s.id === story.nextEventId)
    : null;

  return (
    <div className="stories-page">
      <div className="story-detail-wrapper">

        {/* ── Breadcrumb ── */}
        <Link to="/stories" className="breadcrumb">
          <ArrowLeft /> Back to Archive
        </Link>

        {/* ── Header ── */}
        <header className="detail-header">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="detail-category-tag">{story.category}</span>
            <div style={{ display: "flex", gap: "15px" }}>
              <button
                onClick={() => {
                  const sectionsText = Object.values(story.sections).join(" ");
                  toggleSpeech(`${story.title}. ${story.shortDescription}. ${sectionsText}`);
                }}
                className="narration-btn"
                style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "var(--gold)", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                title={isSpeaking ? "Stop Narrator" : "Listen to Story"}
              >
                {isSpeaking ? "⏹️" : "🔊"}
              </button>
              <button
                onClick={() => {
                  toggleBookmark({
                    id: story.id,
                    title: story.title,
                    shortDescription: story.shortDescription,
                    type: 'story'
                  });
                  setTick(t => t + 1);
                }}
                className="bookmark-btn"
                style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "var(--gold)", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                title={isBookmarked(story.id) ? "Remove Bookmark" : "Save Story"}
              >
                {isBookmarked(story.id) ? "⭐" : "☆"}
              </button>
            </div>
          </div>
          <h1 className="detail-title">{story.title}</h1>
          <div className="detail-meta-row">
            <span><ClockIcon /> {story.period}</span>
            <span><PinIcon /> {story.location}</span>
          </div>
        </header>

        {/* ── Story Sections ── */}
        <div className="story-sections">
          {Object.entries(SECTION_LABELS).map(([key, label]) =>
            story.sections[key] ? (
              <div className="story-section" key={key}>
                <p className="section-label">{label}</p>
                <p className="section-body">{story.sections[key]}</p>
              </div>
            ) : null
          )}
        </div>

        {/* ── Did You Know ── */}
        {story.didYouKnow && (
          <div className="did-you-know">
            <p className="dyk-label"><LightbulbIcon /> Did You Know?</p>
            <p className="dyk-text">{story.didYouKnow}</p>
          </div>
        )}

        {/* ── Timeline Navigation ── */}
        <nav className="timeline-nav" aria-label="Chronological navigation">
          <button
            className={`timeline-nav-btn prev ${!prevStory ? "disabled" : ""}`}
            onClick={() => prevStory && navigate(`/stories/${prevStory.id}`)}
            disabled={!prevStory}
            aria-label={prevStory ? `Previous: ${prevStory.title}` : "No previous story"}
          >
            <span className="nav-dir"><ArrowLeft /> Previous</span>
            {prevStory ? (
              <>
                <span className="nav-story-title">{prevStory.title}</span>
                <span className="nav-period">{prevStory.period}</span>
              </>
            ) : (
              <span className="nav-story-title" style={{ opacity: 0.4 }}>
                Beginning of the archive
              </span>
            )}
          </button>

          <button
            className={`timeline-nav-btn next ${!nextStory ? "disabled" : ""}`}
            onClick={() => nextStory && navigate(`/stories/${nextStory.id}`)}
            disabled={!nextStory}
            aria-label={nextStory ? `Next: ${nextStory.title}` : "No next story"}
          >
            <span className="nav-dir">Next <ArrowRight /></span>
            {nextStory ? (
              <>
                <span className="nav-story-title">{nextStory.title}</span>
                <span className="nav-period">{nextStory.period}</span>
              </>
            ) : (
              <span className="nav-story-title" style={{ opacity: 0.4 }}>
                End of the archive
              </span>
            )}
          </button>
        </nav>

        {/* ── Quiz ── */}
        {story.questions && story.questions.length > 0 && (
          <section className="quiz-section" aria-label="Knowledge quiz" style={{ marginTop: '40px' }}>
            <div className="quiz-header">
              <span className="quiz-label" style={{ color: 'var(--gold)' }}>Test Your Knowledge</span>
            </div>
            <h3 style={{
              fontFamily: "Cinzel, serif",
              fontSize: "24px",
              color: "var(--text)",
              marginBottom: "30px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              paddingBottom: "10px"
            }}>
              {story.title} — Quick Quiz
            </h3>
            <div className="quiz-questions">
              {story.questions.map((q, index) => (
                <div key={index} className="quiz-card" style={{ marginBottom: '20px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <h3 style={{ marginBottom: '15px', fontSize: '18px', lineHeight: '1.4' }}>Q{index + 1}. {q.question}</h3>
                  {q.options.map((option, i) => (
                    <div 
                      key={i} 
                      className="option"
                      onClick={() => !isSubmitted && setSelectedAnswers({ ...selectedAnswers, [index]: option })}
                      style={{
                        padding: '12px 16px',
                        margin: '10px 0',
                        cursor: isSubmitted ? 'default' : 'pointer',
                        borderRadius: '6px',
                        border: selectedAnswers[index] === option ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: selectedAnswers[index] === option 
                          ? "rgba(212, 175, 55, 0.15)" // subtle gold theme highlight
                          : "transparent",
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <strong>{String.fromCharCode(65 + i)}.</strong> {option}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {!isSubmitted ? (
              <button 
                onClick={handleSubmitQuiz}
                style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  backgroundColor: 'var(--gold)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Submit Quiz
              </button>
            ) : (
              <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid var(--gold)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h2 style={{ color: 'var(--gold)', marginBottom: '10px' }}>Quiz Completed!</h2>
                <h3 style={{ fontSize: '24px' }}>Score: {score} / {story.questions.length}</h3>
              </div>
            )}
          </section>
        )}

      </div>
    </div>
  );
}
