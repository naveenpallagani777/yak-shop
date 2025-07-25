// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const yakRouter = require('./routers/yak.router');
const globalErrorHandler = require('./controllers/error.controller');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/yak-shop', yakRouter);
app.use(globalErrorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to the Yak API!');
});

// Connect to MongoDB
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
mongoose.connect(dbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(process.env.PORT || 3000, () => {
  console.log('CI/CD pipeline is set up successfully 2004!');
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
module.exports = app;