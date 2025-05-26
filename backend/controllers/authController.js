const bcrypt = require('bcrypt');
const db = require('../db'); 

// Fungsi untuk handle register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru ke database dengan email
    db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Gagal registrasi', error: err });
        }
        res.status(201).json({ message: 'Registrasi berhasil' });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};


// Fungsi untuk handle login
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Query error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Email tidak ditemukan' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login berhasil', token });
  });
};


