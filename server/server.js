// Temporarily silence console while loading dotenv to avoid noisy 3rd-party logs
const _consoleLog = console.log;
const _consoleInfo = console.info;
const _consoleWarn = console.warn;
console.log = console.info = console.warn = () => { };
require('dotenv').config();
// restore console
console.log = _consoleLog;
console.info = _consoleInfo;
console.warn = _consoleWarn;


process.on('warning', () => { });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

// API routes
// const profileRoutes = require('./routes/profile');
const projectsRoutes = require('./routes/projects');
const skillsRoutes = require('./routes/skills');
const searchRoutes = require('./routes/search');
const userRoutes = require('./routes/userRoutes');
const certificateRoutes = require('./routes/certificates'); // <-- NAYI LINE

const { errorHandler, notFound } = require('./middleware/errorHandler');

app.get('/', (req, res) => res.send('API is running...'));

// app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/certificates', certificateRoutes); // <-- NAYI LINE

// Not found + error handler
app.use(notFound);
app.use(errorHandler);

// Connect to DB first, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log('Server running on port ' + PORT));
  })
  .catch((err) => {
    console.error('Failed to start server due to DB error', err);
    process.exit(1);
  });