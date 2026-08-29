const pool = require('../db');

// CREATE PATIENT
exports.createPatient = async (req, res) => {
  try {
    const { name, age, history } = req.body;
    const [result] = await pool.query(
      'INSERT INTO patients (name, age, history) VALUES (?, ?, ?)',
      [name, age, history]
    );
    res.status(201).json({ id: result.insertId, name, age, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL PATIENTS
exports.getPatients = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM patients');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE PATIENT
exports.getPatientById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM patients WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE PATIENT
exports.updatePatient = async (req, res) => {
  try {
    const { name, age, history } = req.body;
    await pool.query(
      'UPDATE patients SET name = ?, age = ?, history = ? WHERE id = ?',
      [name, age, history, req.params.id]
    );
    res.json({ success: true, message: 'Patient updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE PATIENT
exports.deletePatient = async (req, res) => {
  try {
    await pool.query('DELETE FROM patients WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
