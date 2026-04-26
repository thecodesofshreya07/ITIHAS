require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB');
    const result = await mongoose.connection.db.collection('users').updateMany(
      {},
      // Remove anything that isn't 'main' just to be safe and clean up legacy story quizzes
      { $pull: { progress: { source: { $ne: "main" } } } }
    );
    console.log('Cleanup complete:', result);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
