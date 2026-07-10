require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

const seed = require('./database/seed');
const { attachUser } = require('./middleware/auth');

const pageRoutes = require('./routes/pageRoutes');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Pastikan skema & data awal tersedia
seed();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'rahasia-default-ganti-ini',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 hari
  })
);

app.use(attachUser);

app.use('/', pageRoutes);
app.use('/', authRoutes);
app.use('/', bookingRoutes);
app.use('/', adminRoutes);
app.use('/', customerRoutes);
app.use('/', favoriteRoutes);
app.use('/', notificationRoutes);

app.use((req, res) => {
  res.status(404).render('404', { message: 'Halaman tidak ditemukan.' });
});

app.listen(PORT, () => {
  console.log(`Ren-Car GEN Z berjalan di http://localhost:${PORT}`);
});
