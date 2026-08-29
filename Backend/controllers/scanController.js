const pool = require('../db');

exports.uploadScan = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { originalname, filename, mimetype } = req.file;

        const [result] = await pool.query(
            'INSERT INTO scanned_documents (original_filename, stored_filename, file_type) VALUES (?, ?, ?)',
            [originalname, filename, mimetype]
        );

        res.status(201).json({
            message: 'File uploaded successfully',
            id: result.insertId,
            filename: filename,
            url: `/uploads/${filename}`
        });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Server error during upload' });
    }
};

exports.getAllScans = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM scanned_documents ORDER BY uploaded_at DESC');
        res.json(rows);
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).json({ error: 'Server error fetching scans' });
    }
};