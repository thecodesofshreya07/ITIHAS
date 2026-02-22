import { useMemo, useState } from "react";
import { geoGraticule10, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import countriesTopo from "world-atlas/countries-110m.json";
import "./Map.css";

const CIVILIZATIONS = [
  {
    id: "indus-valley",
    name: "Indus Valley Civilization",
    era: "c. 3300 – 1300 BCE",
    region: "South Asia (Indus River basin)",
    description:
      "One of the world’s earliest urban civilizations, flourishing along the Indus River and its tributaries in what is now Pakistan and northwest India. The Indus people built carefully planned brick cities like Harappa and Mohenjo-daro, with straight streets, multi‑storey houses, public granaries, and some of the most sophisticated drainage and sanitation systems of the ancient world. Their standardized weights, seals, and craft production suggest a highly organized economy, even though their script remains undeciphered.",
    images: [
      {
        src: "src/assets/indus1.jpg",
        alt: "Approximate extent of the Indus Valley Civilization",
      },
      {
        src: "src/assets/indus2.jpg",
        alt: "Ruins of Mohenjo-daro, an Indus city",
      },
    ],
    markerLonLat: [72.8, 29.4],
    view: { centerLonLat: [70, 28], scale: 360 },
    highlightLabel: "Indus Valley",
  },
  {
    id: "egyptian",
    name: "Ancient Egypt",
    era: "c. 3100 – 30 BCE",
    region: "Northeast Africa (Nile Valley)",
    description:
      "Ancient Egypt rose along the fertile banks of the Nile River, where predictable floods allowed farmers to grow surplus crops that sustained a powerful state. Pharaohs ruled as divine kings, overseeing the construction of monumental pyramids, obelisks, and temples decorated with vivid wall paintings and hieroglyphic inscriptions. From the Old Kingdom to the era of Cleopatra, Egyptian culture developed complex religious beliefs about the afterlife, advanced knowledge of mathematics and engineering, and a distinctive artistic style that remained remarkably stable over millennia.",
    images: [
      {
        src: "src/assets/egypt1.jpg",
        alt: "Nile Valley and surrounding regions in Egypt",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
        alt: "The Great Pyramid of Giza on the Giza Plateau",
      },
    ],
    markerLonLat: [31.2, 26.8],
    view: { centerLonLat: [28, 26], scale: 360 },
    highlightLabel: "Nile Valley",
  },
  {
    id: "mesopotamia",
    name: "Mesopotamia",
    era: "c. 3500 – 539 BCE",
    region: "Fertile Crescent (Tigris–Euphrates)",
    description:
      "Mesopotamia, literally “the land between the rivers”, lay between the Tigris and Euphrates in modern Iraq and Syria. Here, city‑states like Uruk, Ur, and later Babylon pioneered early forms of writing (cuneiform), monumental temple complexes called ziggurats, and some of the first known legal codes, including the famous Code of Hammurabi. Over many centuries, Sumerians, Akkadians, Babylonians, and Assyrians built and rebuilt empires in this region, leaving a legacy of myths, mathematics, and astronomy that influenced later civilizations across the Near East and beyond.",
    images: [
      {
        src: "src/assets/mes1.jpg",
        alt: "Map showing the core cities of ancient Mesopotamia",
      },
      {
        src: "src/assets/mes2.jpg",
        alt: "Reconstruction of the Ishtar Gate of Babylon",
      },
    ],
    markerLonLat: [44.4, 33.3],
    view: { centerLonLat: [43, 33], scale: 380 },
    highlightLabel: "Mesopotamia",
  },
];

const CONTINENT_LABELS = [
  { name: "NORTH AMERICA", lonLat: [-105, 48] },
  { name: "SOUTH AMERICA", lonLat: [-60, -15] },
  { name: "EUROPE", lonLat: [15, 52] },
  { name: "AFRICA", lonLat: [20, 8] },
  { name: "ASIA", lonLat: [90, 45] },
  { name: "AUSTRALIA", lonLat: [135, -25] },
  { name: "ANTARCTICA", lonLat: [0, -78] },
];

export default function Map() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const selected = CIVILIZATIONS[currentIndex];
  const width = 800;
  const height = 400;

  const countries = useMemo(() => {
    // world-atlas exports TopoJSON with `objects.countries`
    return feature(countriesTopo, countriesTopo.objects.countries).features;
  }, []);

  const projection = useMemo(() => {
    const centerLonLat = selected?.view?.centerLonLat ?? [0, 20];
    const scale = selected?.view?.scale ?? 155;

    return geoMercator()
      .center(centerLonLat)
      .scale(scale)
      .translate([width / 2, height / 2]);
  }, [selected, width, height]);

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);
  const graticule = useMemo(() => geoGraticule10(), []);

  const selectedPoint = selected?.markerLonLat
    ? projection(selected.markerLonLat)
    : null;

  const goToIndex = (index) => {
    if (index < 0) {
      setCurrentIndex(CIVILIZATIONS.length - 1);
    } else if (index >= CIVILIZATIONS.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    goToIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    goToIndex(currentIndex - 1);
  };

  return (
    <div className="map-section">
      <div className="map-layout">
        <div className="map-container">
          <div className="map-world-background">
            <svg
              viewBox="0 0 800 400"
              className="map-svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="oceanGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1b1510" />
                  <stop offset="100%" stopColor="#090705" />
                </linearGradient>
                <radialGradient id="regionGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(201,161,74,0.4)" />
                  <stop offset="100%" stopColor="rgba(10,8,5,0)" />
                </radialGradient>
              </defs>
              <rect width="800" height="400" fill="url(#oceanGradient)" />

              <path
                d={pathGenerator(graticule) ?? ""}
                className="map-graticule"
              />

              <g className="map-countries">
                {countries.map((geo) => (
                  <path
                    key={geo.id}
                    d={pathGenerator(geo) ?? ""}
                    className="map-country"
                  />
                ))}
              </g>

              {/* Continent / region labels (very approximate) */}
              <g className="map-continent-labels">
                {CONTINENT_LABELS.map((label) => {
                  const point = projection(label.lonLat);
                  if (!point) return null;
                  const [x, y] = point;
                  if (x < 0 || x > width || y < 0 || y > height) return null;

                  return (
                    <text
                      key={label.name}
                      x={x}
                      y={y}
                      className="map-continent-label"
                    >
                      {label.name}
                    </text>
                  );
                })}
              </g>

              {/* Selected civilization glow */}
              {selectedPoint && (
                <g className="map-selected-glow">
                  <circle
                    cx={selectedPoint[0]}
                    cy={selectedPoint[1]}
                    r="30"
                    fill="url(#regionGlow)"
                    opacity="0.75"
                  />
                  <text
                    x={selectedPoint[0] + 10}
                    y={selectedPoint[1] - 12}
                    className="map-region-label"
                  >
                    {selected.highlightLabel}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {CIVILIZATIONS.map((civ, index) => {
            const point = projection(civ.markerLonLat);
            if (!point) return null;
            const [x, y] = point;

            return (
              <button
                key={civ.id}
                type="button"
                className={`map-marker ${
                  index === currentIndex ? "map-marker--active" : ""
                }`}
                style={{
                  top: `${(y / height) * 100}%`,
                  left: `${(x / width) * 100}%`,
                }}
                onClick={() => setCurrentIndex(index)}
              >
                <span className="map-marker-pulse" />
                <span className="map-marker-dot" />
              </button>
            );
          })}
        </div>

        <div className="map-card">
          {selected && (
            <>
              <div className="map-card-header">
                <div>
                  <h3 className="map-card-title">{selected.name}</h3>
                  <p className="map-card-era">{selected.era}</p>
                  <p className="map-card-region">{selected.region}</p>
                </div>
              </div>

              <p className="map-card-description">{selected.description}</p>

              {selected.images && selected.images.length > 0 && (
                <div className="map-card-gallery">
                  {selected.images.map((img) => (
                    <figure key={img.src} className="map-card-image-wrapper">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="map-card-image"
                      />
                      <figcaption className="map-card-caption">
                        {img.alt}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              <div className="map-card-footer">
                <span>
                  Showing {currentIndex + 1} of {CIVILIZATIONS.length} civilizations
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="map-slider">
        <div className="map-slider-header">
          <button
            type="button"
            className="map-slider-button"
            onClick={handlePrev}
          >
            ◀ Previous
          </button>
          <div className="map-slider-current">
            <span className="map-slider-label">Currently viewing</span>
            <span className="map-slider-name">{selected?.name}</span>
          </div>
          <button
            type="button"
            className="map-slider-button"
            onClick={handleNext}
          >
            Next ▶
          </button>
        </div>

        <input
          type="range"
          min="0"
          max={CIVILIZATIONS.length - 1}
          value={currentIndex}
          onChange={(event) => goToIndex(Number(event.target.value))}
          className="map-slider-input"
        />

        <div className="map-slider-ticks">
          {CIVILIZATIONS.map((civ, index) => (
            <button
              key={civ.id}
              type="button"
              className={`map-slider-tick ${
                index === currentIndex ? "map-slider-tick--active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="map-slider-tick-dot" />
              <span className="map-slider-tick-text">{civ.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}