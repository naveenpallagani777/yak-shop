const router = require('express').Router();
const uploadController = require('../controllers/upload.controller');
const { imageUploadMiddleware } = require('../middleware/uploadMiddleware');

router.post('/upload', (req, res, next) => {
    console.log('Upload request received');
    next();
}, imageUploadMiddleware, uploadController.uploadFile); 
module.exports = router;