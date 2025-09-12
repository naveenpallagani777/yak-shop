require('dotenv').config();

exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `http://35.200.228.87/api/images/${req.file.filename}`;
    console.log('File uploaded:', req.file);

    return res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        fileUrl
    });
};
