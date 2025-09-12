const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Folder to store images
const publicDir = path.join(__dirname, '../public/images/'); // go up from middleware folder

// Ensure folder exists
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, publicDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

// File validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only jpg, png, webp images are allowed'), false);
};

// Multer instance
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Middleware for single image upload
exports.imageUploadMiddleware = upload.single('image');
