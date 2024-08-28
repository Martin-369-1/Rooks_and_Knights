const multer = require('multer');
const path = require('node:path');
const crypto = require('node:crypto')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/upload'));
    },
    filename: (req, file, cb) => {
        const fieldName = file.fieldname;
        const currentDate = Date.now();
        const fileName = `${fieldName}-${crypto.randomInt(100, 1000)}-${currentDate}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Adjust limit as needed
}).fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 }
]);

module.exports = upload;
