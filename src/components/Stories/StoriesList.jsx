import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import storiesData from "./stories.json";
import "./Stories.css";

// ── Icon helpers ──────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Main Component ────────────────────────────────────────────
export default function StoriesList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = [...new Set(storiesData.map((s) => s.category))].sort();
    return ["All", ...cats];
  }, []);

  const filteredStories = useMemo(() => {
    return storiesData.filter((story) => {
      const matchesSearch = story.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || story.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const handleReadMore = (id) => navigate(`/stories/${id}`);

  const truncate = (str, max = 120) =>
    str.length <= max ? str : str.slice(0, max).trimEnd() + "…";

  return (
    <div className="stories-page">
      <div className="stories-list-wrapper">

        {/* ── Page Header ── */}
        <header className="stories-page-header">
          {/* <p className="eyebrow">Historical Time Machine</p> */}
          <h1>The Archive of Ages</h1>
          <p>
            Dispatches from the turning points that forged our world — wars,
            revolutions, and ideas whose echoes never fade.
          </p>
        </header>

        {/* ── Controls ── */}
        <div className="controls-bar">
          <div className="search-wrapper">
            <SearchIcon />
            <input
              type="text"
              className="search-input"
              placeholder="Search by title…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search stories"
            />
          </div>
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        <p className="results-count">
          {filteredStories.length === storiesData.length
            ? `${storiesData.length} stories in the archive`
            : `${filteredStories.length} of ${storiesData.length} stories`}
        </p>

        {/* ── Cards Grid ── */}
        <div className="cards-grid">
          {filteredStories.length === 0 ? (
            <p className="no-results">
              No stories match your search. Try a different term or category.
            </p>
          ) : (
            filteredStories.map((story) => (
              <article
                key={story.id}
                className="story-card"
                onClick={() => handleReadMore(story.id)}
              >
                <span className="card-category-tag">{story.category}</span>

                <h2 className="card-title">{story.title}</h2>

                <div className="card-meta">
                  <span><ClockIcon /> {story.period}</span>
                  <span><PinIcon /> {story.location}</span>
                </div>

                <p className="card-description">
                  {truncate(story.shortDescription)}
                </p>

                <hr className="card-divider" />

                <button
                  className="card-read-more"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReadMore(story.id);
                  }}
                  aria-label={`Read more about ${story.title}`}
                >
                  Read Story <ArrowIcon />
                </button>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
