require('dotenv').config();
console.log('API key loaded:', !!process.env.ANTHROPIC_API_KEY);
const express = require('express');
const pool = require('./db');
const patientRoutes = require('./routes/patientRoutes');
const chatRoutes = require('./routes/chatRoutes');
const scanRoutes = require('./routes/scanRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/patients', patientRoutes);
app.use(chatRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/scans', scanRoutes);

// Test DB connection on startup
pool.getConnection()
  .then(conn => {
    console.log('MySQL connected');
    conn.release();
  })
  .catch(err => console.error('Connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
