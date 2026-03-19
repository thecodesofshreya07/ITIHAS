import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import storiesData from "./stories.json";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import "./Stories.css";

// ── Icon helpers ──────────────────────────────────────────────
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

// ── Filtering Logic ────────────────────────────────────────────
/**
 * Filters the list of stories based on search query, era, and region.
 * Implements case-insensitive search on title and description.
 */
const getFilteredStories = (data, search, era, region) => {
  const query = search.toLowerCase().trim();
  
  return data.filter((story) => {
    // Search condition: matches title OR shortDescription
    const matchesSearch = !query || 
      story.title.toLowerCase().includes(query) || 
      story.shortDescription.toLowerCase().includes(query);

    // Filter condition: Era
    const matchesEra = era === "All" || story.era === era;

    // Filter condition: Region
    const matchesRegion = region === "All" || story.region === region;

    return matchesSearch && matchesEra && matchesRegion;
  });
};

// ── Main Component ────────────────────────────────────────────
export default function StoriesList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedEra, setSelectedEra] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");

  // Derive eras and regions from data for dropdowns
  const eras = useMemo(() => {
    const uniqueEras = [...new Set(storiesData.map((s) => s.era))].filter(Boolean).sort();
    return ["All", ...uniqueEras];
  }, []);

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(storiesData.map((s) => s.region))].filter(Boolean).sort();
    return ["All", ...uniqueRegions];
  }, []);

  // Compute filtered stories
  const filteredStories = useMemo(() => {
    return getFilteredStories(storiesData, search, selectedEra, selectedRegion);
  }, [search, selectedEra, selectedRegion]);

  const handleReadMore = (id) => navigate(`/stories/${id}`);

  const truncate = (str, max = 120) =>
    str.length <= max ? str : str.slice(0, max).trimEnd() + "…";

  return (
    <div className="stories-page">
      <div className="stories-list-wrapper">

        {/* ── Page Header ── */}
        <header className="stories-page-header">
          <h1>The Archive of Ages</h1>
          <p>
            Dispatches from the turning points that forged our world — wars,
            revolutions, and ideas whose echoes never fade.
          </p>
        </header>

        {/* ── Controls ── */}
        <div className="controls-bar">
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Search historical events..."
          />
          <FilterBar 
            selectedEra={selectedEra}
            onEraChange={setSelectedEra}
            eras={eras}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            regions={regions}
          />
        </div>

        <p className="results-count">
          {filteredStories.length === storiesData.length
            ? `${storiesData.length} stories in the archive`
            : `${filteredStories.length} of ${storiesData.length} stories matched`}
        </p>

        {/* ── Cards Grid ── */}
        <div className="cards-grid">
          {filteredStories.length === 0 ? (
            <div className="no-results" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px 20px" }}>
              <p style={{ fontSize: "24px", color: "var(--gold)", marginBottom: "12px" }}>🏛️ No match found</p>
              <p>We couldn't find any stories matching your criteria. Try adjusting your search or filters.</p>
              <button 
                onClick={() => { setSearch(""); setSelectedEra("All"); setSelectedRegion("All"); }}
                style={{
                  background: "none",
                  border: "1px solid var(--gold-dim)",
                  color: "var(--gold)",
                  padding: "8px 16px",
                  marginTop: "24px",
                  cursor: "pointer",
                  fontFamily: "'Cinzel', serif",
                  borderRadius: "4px"
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredStories.map((story) => (
              <article
                key={story.id}
                className="story-card"
                onClick={() => handleReadMore(story.id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span className="card-category-tag">{story.era}</span>
                  <span style={{ fontSize: "10px", color: "var(--gold-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{story.region}</span>
                </div>

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

