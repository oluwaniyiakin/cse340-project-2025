require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const routes = require('./routes/index'); // Main routes file
const path = require('path');

const app = express();

console.log("Database URL:", process.env.DATABASE_URL);
// Middleware
app.use(morgan('dev')); // Logs HTTP requests
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(methodOverride('_method')); // Allows PUT/DELETE in forms

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', routes);

// Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).render('error/404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error/500', { title: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
