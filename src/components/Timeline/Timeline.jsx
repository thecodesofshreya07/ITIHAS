import React, { useEffect, useState } from 'react';
import './Timeline.css';

const historyEras = {
  Ancient: [
    {
      year: "3300 BCE",
      title: "Indus Valley",
      desc: "The Indus Valley Civilization begins to flourish along the Indus and its tributaries. Carefully planned cities with straight streets, brick houses, and advanced drainage systems emerge, revealing a society that valued order, hygiene, and trade.",
      imgs: ["https://picsum.photos/id/10/400/300"],
    },
    {
      year: "2500 BCE",
      title: "Great Pyramids",
      desc: "On the Giza plateau in Egypt, massive stone pyramids rise as royal tombs for the pharaohs. Built with astonishing precision, they reflect both the engineering genius and religious beliefs of a civilization focused on the afterlife.",
      imgs: ["https://picsum.photos/id/11/400/300"],
    },
  ],
  Medieval: [
    {
      year: "1526",
      title: "Mughal Empire",
      desc: "Babur defeats the Delhi Sultanate at the First Battle of Panipat and lays the foundation of the Mughal Empire in India. Over time, the Mughals blend Persian, Central Asian, and Indian traditions in art, architecture, and administration.",
      imgs: ["https://picsum.photos/id/12/400/300"],
    },
  ],
  "Early Modern": [
    {
      year: "1760",
      title: "Industrial Revolution",
      desc: "In Britain and later across Europe, new machines powered by coal and steam transform how goods are produced. Textile mills, ironworks, and railways reshape cities, work, and daily life, marking the beginning of the modern industrial age.",
      imgs: ["https://picsum.photos/id/13/400/300"],
    },
  ],
  "Modern": [
      
  { year: "1903", title: "First Powered Flight", desc: "The Wright brothers flew the first airplane.Wilbur and Orville Wright spent four years of research and development to create the first successful powered airplane, the 1903 Wright Flyer. It first flew at Kitty Hawk, North Carolina, on December 17, 1903, with Orville at the controls.", imgs: ["data:image/jpeg;base64,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", "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRpDtX60NdQkuC_t7BMfOXB9f6NEPtjALvi2tfnJ0HiKSC1GOsBQme3FY5Jz8ayEcvolnCHsnYIluA2cMy7"] },
  { year: "1914", title: "World War I Begins", desc: "The conflict began after the assassination of Archduke Franz Ferdinand, engulfing Europe in war.", imgs: ["https://allthatsinteresting.com/wordpress/wp-content/uploads/2015/04/wwi-photos-irish-rifles.jpg", "https://upload.wikimedia.org/wikipedia/commons/e/e6/1914-06-29_-_Aftermath_of_attacks_against_Serbs_in_Sarajevo.png"] },
  { year: "1917", title: "Russian Revolution", desc: "The Bolsheviks led by Vladimir Lenin overthrew the Russian government, forming the Soviet Union.", imgs: ["https://cdn.britannica.com/78/121178-050-95767572/crowd-Vladimir-Ilyich-Lenin-Russian-Revolution-1917.jpg", "https://news.lafayette.edu/wp-content/blogs.dir/2/files/2017/11/Russian-Revolution-1917.jpg"] },
  { year: "1929", title: "Great Depression", desc: "A global economic crisis began after the Wall Street crash, leading to a financial collapse.", imgs: ["https://data.bunkhistory.org/images/8738/rectangle_large", "https://cdn.britannica.com/25/187725-131-7F3B1ADC/men-line-food-Chicago-Great-Depression-Illinois.jpg"] },
  { year: "1939", title: "World War II Begins", desc: "Germany invaded Poland, triggering the deadliest conflict in human history.", imgs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Munich_Agreement_Bundesarchiv_Bild_183-R69173.jpg/1280px-Munich_Agreement_Bundesarchiv_Bild_183-R69173.jpg", "https://upload.wikimedia.org/wikipedia/commons/0/09/Shanghai1937IJA_ruins.jpg"] },
  { year: "1945", title: "World War II Ends", desc: "The war ended after the surrender of Germany and Japan, leading to the creation of the UN.", imgs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Yalta_Conference_%28Churchill%2C_Roosevelt%2C_Stalin%29_%28B%26W%29.jpg/500px-Yalta_Conference_%28Churchill%2C_Roosevelt%2C_Stalin%29_%28B%26W%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Mamoru_Shigemitsu_signs_the_Instrument_of_Surrender%2C_officially_ending_the_Second_World_War.jpg/500px-Mamoru_Shigemitsu_signs_the_Instrument_of_Surrender%2C_officially_ending_the_Second_World_War.jpg"] },
  { year: "1947", title: "India Independence", desc: "India gained freedom from British colonial rule on August 15, 1947, a landmark event in world history.", imgs: ["https://sabrangindia.in/sites/default/files/field/image/independence-day-nehru.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Jawaharlal_Nehru_delivering_his_%22tryst_with_destiny%22_speech.jpg/1280px-Jawaharlal_Nehru_delivering_his_%22tryst_with_destiny%22_speech.jpg"] },
  { year: "1957", title: "Sputnik Launch", desc: "The Soviet Union launched the first artificial satellite, Sputnik 1, beginning the Space Age.", imgs: ["https://upload.wikimedia.org/wikipedia/commons/b/be/Sputnik_asm.jpg", "https://picsum.photos/id/110/400/300"] },
  { year: "1960", title: "African Independence", desc: "Seventeen African nations gained independence from colonial powers, known as the 'Year of Africa'.", imgs: ["https://upload.wikimedia.org/wikipedia/commons/9/9a/Africa_independence_map.jpg", "https://picsum.photos/id/111/400/300"] }
  ]
};

function Timeline() {
  
  const [selectedEra, setSelectedEra] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!selectedEra || !autoPlay) return;

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
  }, [selectedEra, autoPlay]);

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
                <h2>{selectedEvent.year}</h2>
                <h3>{selectedEvent.title}</h3>
                <p>{selectedEvent.desc}</p>
                <div className="image-gallery">
                  {selectedEvent.imgs.map((img, i) => (
                    <img key={i} src={img} className="event-img" alt="History" />
                  ))}
                </div>
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