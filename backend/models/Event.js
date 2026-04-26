const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  era: { type: String, required: true },
  year: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  imgs: [String],
  youtubeVideoId: { type: String }
});

module.exports = mongoose.model('Event', EventSchema);
