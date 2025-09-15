const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

// Folder to clean
const imagesDir = path.join(__dirname, '../public/images');

// Age limit in milliseconds (e.g., 24 hours)
const MAX_AGE = 60 * 1000; // 24 hours
// 24 * 60 * 
// Cron job: runs every day at midnight
cron.schedule('* * * * *', () => {
    console.log('🗑️ Running image cleanup cron job...');

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error('❌ Failed to read images directory:', err);
            return;
        }

        const now = Date.now();

        files.forEach(file => {
            const filePath = path.join(imagesDir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('❌ Failed to get stats for file:', file, err);
                    return;
                }

                // If file is older than MAX_AGE, delete it
                if (now - stats.mtimeMs > MAX_AGE) {
                    fs.unlink(filePath, err => {
                        if (err) {
                            console.error('❌ Failed to delete file:', file, err);
                        } else {
                            console.log('✅ Deleted old file:', file);
                        }
                    });
                }
            });
        });
    });
});

console.log('✅ Image cleanup cron scheduled.');