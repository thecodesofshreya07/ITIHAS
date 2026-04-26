const mongoose = require('mongoose');
const Event = require('./models/Event');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/itihas';

const seedEvents = [
  {
    era: "Ancient",
    year: "3300 BCE",
    title: "Indus Valley",
    desc: "The Indus Valley Civilization, one of the three early cradles of civilizations of the Old World, flourished in the basins of the Indus River. It is noted for its urban planning, baked brick houses, elaborate drainage systems, water supply systems, and clusters of large non-residential buildings. At its peak, it may have had a population of over five million.",
    imgs: ["https://picsum.photos/id/10/400/300"],
    youtubeVideoId: "7GRob-zFs0k"
  },
  {
    era: "Ancient",
    year: "2500 BCE",
    title: "Great Pyramids",
    desc: "On the Giza plateau in Egypt, massive stone pyramids rise as royal tombs for the pharaohs. Built with astonishing precision, they reflect both the engineering genius and religious beliefs of a civilization focused on the afterlife.",
    imgs: ["https://picsum.photos/id/11/400/300"],
    youtubeVideoId: "TMkoX1kfyDs"
  },
  {
    era: "Ancient",
    year: "27 BCE",
    title: "Roman Empire",
    desc: "Augustus Caesar establishes the Roman Empire, marking the end of the Roman Republic. Spanning across Europe, North Africa, and the Middle East, it laid the foundations for Western law, architecture, and language. Its network of roads and aqueducts were engineering marvels.",
    imgs: ["https://picsum.photos/id/14/400/300"],
    youtubeVideoId: "XUlRzFSESYs"
  },
  {
    era: "Medieval",
    year: "1453",
    title: "Fall of Constantinople",
    desc: "The capture of the Byzantine Empire's capital by the Ottoman Empire under Mehmed the Conqueror. This event profoundly affected the political landscape of Europe, restricted the Silk Road, and helped trigger the European Renaissance by driving Greek scholars to Italy.",
    imgs: ["https://picsum.photos/id/15/400/300"],
    youtubeVideoId: "Hnxmh_NxPcs"
  },
  {
    era: "Medieval",
    year: "1526",
    title: "Mughal Empire",
    desc: "Babur defeats the Delhi Sultanate at the First Battle of Panipat and lays the foundation of the Mughal Empire in India. Over time, the Mughals blend Persian, Central Asian, and Indian traditions in art, architecture, and administration.",
    imgs: ["https://picsum.photos/id/12/400/300"],
    youtubeVideoId: "fMsmCxIEQr4"
  },
  {
    era: "Early Modern",
    year: "1760",
    title: "Industrial Revolution",
    desc: "In Britain and later across Europe, new machines powered by coal and steam transform how goods are produced. Textile mills, ironworks, and railways reshape cities, work, and daily life, marking the beginning of the modern industrial age.",
    imgs: ["https://picsum.photos/id/13/400/300"],
    youtubeVideoId: "xLhNP0qp38Q"
  },
  {
    era: "Modern",
    year: "1903",
    title: "First Powered Flight",
    desc: "The Wright brothers flew the first airplane. Wilbur and Orville Wright spent four years of research and development to create the first successful powered airplane, the 1903 Wright Flyer. This monumental achievement changed human transport forever, shrinking the globe and initiating the era of aviation.",
    imgs: ["https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRpDtX60NdQkuC_t7BMfOXB9f6NEPtjALvi2tfnJ0HiKSC1GOsBQme3FY5Jz8ayEcvolnCHsnYIluA2cMy7"],
    youtubeVideoId: "YDlk4Ky_ahs"
  },
  {
    era: "Modern",
    year: "1914",
    title: "World War I Begins",
    desc: "The conflict began after the assassination of Archduke Franz Ferdinand, engulfing Europe in war.",
    imgs: ["https://allthatsinteresting.com/wordpress/wp-content/uploads/2015/04/wwi-photos-irish-rifles.jpg"],
    youtubeVideoId: "dHSQAEam2yc"
  },
  {
    era: "Modern",
    year: "1939",
    title: "World War II Begins",
    desc: "Germany invaded Poland, triggering the deadliest conflict in human history.",
    imgs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Munich_Agreement_Bundesarchiv_Bild_183-R69173.jpg/1280px-Munich_Agreement_Bundesarchiv_Bild_183-R69173.jpg"],
    youtubeVideoId: "HUqy-OQvVtI"
  },
  {
    era: "Modern",
    year: "1947",
    title: "India Independence",
    desc: "India gained freedom from British colonial rule on August 15, 1947, following a prolonged and largely non-violent struggle led by Mahatma Gandhi. The partition of the subcontinent resulted in the creation of two independent nations: India and Pakistan, marking a watershed moment in global decolonization.",
    imgs: ["https://sabrangindia.in/sites/default/files/field/image/independence-day-nehru.jpg"],
    youtubeVideoId: "FcdPsFiGMEA"
  }
];

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    await Event.deleteMany({}); // Clear existing events
    console.log('Cleared existing events.');
    
    await Event.insertMany(seedEvents);
    console.log('Inserted seed events successfully!');
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
  });
