import React, { useEffect, useState } from 'react';
import './Timeline.css';
import { isBookmarked, toggleBookmark } from '../../utils/bookmarkUtils';

function Timeline() {
  const [historyEras, setHistoryEras] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEra, setSelectedEra] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // Fetch events from backend
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/events`)
      .then(res => res.json())
      .then(data => {
        setHistoryEras(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load events:", err);
        setLoading(false);
      });

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

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

  useEffect(() => {
    if (!selectedEra || !autoPlay || !historyEras) return;

    const events = historyEras[selectedEra];
    if (!events || events.length === 0) return;

    const interval = setInterval(() => {
      setSelectedEvent((prev) => {
        if (!prev) {
          return events[0];
        }
        const currentIndex = events.findIndex(
          (e) => e.year === prev.year && e.title === prev.title
        );
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % events.length;
        return events[nextIndex];
      });
    }, 7000); // slow, continuous slider

    return () => clearInterval(interval);
  }, [selectedEra, autoPlay, historyEras]);

  const handleEraClick = (era) => {
    setSelectedEra(era);
    setSelectedEvent(null);
    setAutoPlay(true);
  };

  const handleBack = () => {
    setSelectedEra(null);
    setSelectedEvent(null);
    setAutoPlay(true);
  };

  if (loading) {
    return <div className="container" style={{ display: 'grid', placeItems: 'center', height: '50vh'}}><h2>Loading timeline...</h2></div>;
  }

  if (!historyEras) {
    return <div className="container"><p>Failed to load timeline. Please try again later.</p></div>;
  }

  return (
    <div className="container">
      <p className="timeline-description">
        Travel across ancient, medieval, early modern, and modern eras. Choose an
        era below, then follow the glowing years to see how key moments reshaped
        civilizations.
      </p>

      {/* 1. ERA SELECTION GRID */}
      {!selectedEra ? (
        <div className="era-grid">
          {Object.keys(historyEras).map((era) => (
            <div key={era} className="era-card">
              <button
                type="button"
                className="era-card-button"
                onClick={() => handleEraClick(era)}
              >
                <h2>{era}</h2>
                <p>Explore the {era} Era</p>
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* 2. TIMELINE & EVENT  */
        <div className="timeline-view">
          <button className="back-btn" onClick={handleBack}>← Back to Eras</button>
          <h2 className="era-heading">{selectedEra} Timeline</h2>

          <div className="timeline-nav">
            {historyEras[selectedEra].map((event, index) => (
              <button
                key={index}
                className={`year-btn ${selectedEvent?.year === event.year ? 'active' : ''}`}
                onClick={() => {
                  setAutoPlay(false);
                  setSelectedEvent(event);
                }}
              >
                <strong>{event.year}</strong>
                <small>{event.title}</small>
              </button>
            ))}
          </div>

          <main className="display-area">
            {selectedEvent ? (
              <div className="event-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h2>{selectedEvent.year}</h2>
                    <h3>{selectedEvent.title}</h3>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => toggleSpeech(`${selectedEvent.title}. ${selectedEvent.desc}`)}
                      title={isSpeaking ? "Stop Narrator" : "Listen to Event"}
                      style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "var(--gold)", borderRadius: "50%", width: "35px", height: "35px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      {isSpeaking ? "⏹️" : "🔊"}
                    </button>
                    <button
                      onClick={() => {
                        toggleBookmark({
                          id: `timeline-${selectedEvent.year}-${selectedEvent.title.replace(/\s+/g, '-')}`.toLowerCase(),
                          title: selectedEvent.title,
                          description: `${selectedEvent.year}: ${selectedEvent.desc.substring(0, 50)}...`,
                          type: 'timeline'
                        });
                        setTick(t => t + 1);
                      }}
                      title={isBookmarked(`timeline-${selectedEvent.year}-${selectedEvent.title.replace(/\s+/g, '-')}`.toLowerCase()) ? "Remove Bookmark" : "Save Event"}
                      style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "var(--gold)", borderRadius: "50%", width: "35px", height: "35px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      {isBookmarked(`timeline-${selectedEvent.year}-${selectedEvent.title.replace(/\s+/g, '-')}`.toLowerCase()) ? "⭐" : "☆"}
                    </button>
                  </div>
                </div>
                <p>{selectedEvent.desc}</p>
                
                {selectedEvent.youtubeVideoId && (
                  <div className="video-container" style={{ margin: "20px 0", position: "relative", paddingBottom: "56.25%", height: 0 }}>
                    <iframe 
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "8px" }}
                      src={`https://www.youtube.com/embed/${selectedEvent.youtubeVideoId}`} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                )}

                {!selectedEvent.youtubeVideoId && selectedEvent.imgs && (
                  <div className="image-gallery">
                    {selectedEvent.imgs.map((img, i) => (
                      <img key={i} src={img} className="event-img" alt="History" />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="welcome-msg">Select a year from the timeline above.</p>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default Timeline;