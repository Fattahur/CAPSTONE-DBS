

// require('dotenv').config(); // ⬅️ Tambahkan ini PALING ATAS!

// const express = require('express');
// const app = express();
// const db = require('./db'); // koneksi DB
// const authRoutes = require('./routes/authRoutes'); 

// app.use(express.json());

// // Register route ke express
// app.use('/api/auth', authRoutes); 

// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server berjalan di http://localhost:${PORT}`);
// });




require('dotenv').config(); // ⬅️ Tambahkan ini PALING ATAS!

const express = require('express');
const cors = require('cors'); // ⬅️ Tambahkan ini
const app = express();
const db = require('./db'); // koneksi DB
const authRoutes = require('./routes/authRoutes'); 

app.use(cors({
  origin: 'http://localhost:8080', // 
  credentials: true
}));

app.use(express.json());

// Register route ke express
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
