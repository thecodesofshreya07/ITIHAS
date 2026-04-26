const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  progress: [
    {
      title: String,     // quiz name / era
      score: Number,
      total: Number,
      time: Number,
      source: String,
      date: { type: Date, default: Date.now },
      questions: [
        {
          question: String,
          selectedAnswer: String,
          correctAnswer: String,
          explanation: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
