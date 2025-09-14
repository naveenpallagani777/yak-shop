const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Routers & Middleware
const yakRouter = require('./routers/yak.router');
const uploadRouter = require('./routers/upload.router');
const globalErrorHandler = require('./controllers/error.controller');

dotenv.config();

const app = express();

// ---------------------
// Public folder setup
// ---------------------
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Serve only the images folder
app.use('/api/images', express.static(path.join(publicDir, 'images')));

app.use(express.static(publicDir)); // optional if you want root access

// ---------------------
// Middleware
// ---------------------
app.use(cors());
app.use(express.json());

// ---------------------
// Routes
// ---------------------
app.use('/api', uploadRouter);          // Upload API
app.use('/api/yak-shop', yakRouter);    // Your yak-router API
app.get('/api', (req, res) => res.send('Welcome to the Yak API!'));

// ---------------------
// MongoDB connection
// ---------------------
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
mongoose.connect(dbUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// ---------------------
// Global error handler
// ---------------------
app.use(globalErrorHandler);

// ---------------------
// Start server
// ---------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('CI/CD pipeline is set up successfully with Docker!');
    console.log(`Server is running on port http://localhost:${PORT}`);
    console.log(`Serving static files from: ${publicDir}`);
});

module.exports = app;
