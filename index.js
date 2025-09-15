const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

require('./cron/cleanupImages');

// Load environment variables
dotenv.config();

// Import Routers and Middleware
const yakRouter = require('./routers/yak.router');
const uploadRouter = require('./routers/upload.router');
const globalErrorHandler = require('./controllers/error.controller');

// Initialize Express app
const app = express();

// ---------------------
// Setup Public Folder
// ---------------------
const publicDir = path.join(__dirname, 'public');
const imagesDir = path.join(publicDir, 'images');

// Ensure public and images directory exist
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Serve static files
app.use('/api/images', express.static(imagesDir));  // Serve only images
app.use(express.static(publicDir));                // Serve other public files

// ---------------------
// Middleware Setup
// ---------------------
app.use(cors());
app.use(express.json());

// ---------------------
// API Routes
// ---------------------
app.use('/api', uploadRouter);           // Upload endpoints
app.use('/api/yak-shop', yakRouter);    // Yak-shop specific endpoints

app.get('/api', (req, res) => {
    res.send('Welcome to the Yak API!');
});

// ---------------------
// MongoDB Connection
// ---------------------
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(dbUri)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ---------------------
// Global Error Handling
// ---------------------
app.use(globalErrorHandler);

// ---------------------
// Start the Server
// ---------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('🚀 CI/CD pipeline is set up successfully with Docker!');
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${publicDir}`);
});

// Export app for testing or external usage
module.exports = app;
