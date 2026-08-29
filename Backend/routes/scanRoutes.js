const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const scanController = require('../controllers/scanController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), scanController.uploadScan);
router.get('/', scanController.getAllScans);

module.exports = router;