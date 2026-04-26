const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

// Get all events grouped by era
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ year: 1 });
    
    // Group events by era to match the frontend format
    const historyEras = {
      Ancient: [],
      Medieval: [],
      "Early Modern": [],
      Modern: []
    };

    events.forEach(event => {
      if (!historyEras[event.era]) {
        historyEras[event.era] = [];
      }
      historyEras[event.era].push({
        year: event.year,
        title: event.title,
        desc: event.desc,
        imgs: event.imgs,
        youtubeVideoId: event.youtubeVideoId
      });
    });

    res.json(historyEras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
