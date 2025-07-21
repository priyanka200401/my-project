const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const purchaseRoutes = require('./routes/purchase');
const authenticateToken = require('./middleware/auth');
const mongoose = require('mongoose');
const wishlistRoutes = require('./routes/wishlist');


require('./models/order'); // add this line if not already added

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/wishlist', wishlistRoutes);

app.use('/api/auth', require('./routes/auth'));

app.use('/api/products', require('./routes/product')); 

app.use('/api/purchase', purchaseRoutes);


app.use(express.static(path.join(__dirname, 'client')));

// Serve login.html via /login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'login.html'));
});

// Serve register.html via /register route
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'register.html'));
});

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const productRoutes = require('./routes/product');
app.use('/api/products', productRoutes);  // ✅ This line must exist

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Middleware
app.use(cors());
app.use(express.json());

// Static files (frontend like admin.html)
app.use(express.static(path.join(__dirname, 'public'))); // e.g. /public/admin.html

// Admin API Routes
app.use('/api/admin', adminRoutes); // ✅ Connect admin routes

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/savvydealshub', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));
