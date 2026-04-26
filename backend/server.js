require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

const app = express();

app.use(cors({
  origin: ['https://itihas-one.vercel.app/', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/itihas';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});