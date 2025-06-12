const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const yakRouter = require('./routers/yak.router');
const gobalErrorHandler = require('./controllers/error.controller');

const app = express();

app.use(express.json());
app.use('/api/yak-shop', yakRouter);
app.use(gobalErrorHandler);

app.get('/', (req, res) => {
    res.send('Welcome to the Yak API!');
});

const port = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
// console.log(`Connecting to MongoDB at ${dbUri}`);
mongoose.connect(dbUri
).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});