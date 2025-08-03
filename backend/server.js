const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn'); // MongoDB connection
const userRoutes = require('./routes/api/users'); // user auth routes
require('dotenv').config(); // loading the environment variables

const infoRoutes = require('./routes/api/info'); // info section routes

//initialize express
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

//enabling CORS (only from frontend)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json()); // JSON parsing
app.use(cookieParser()); // cookie parsing (needed for refresh token)

// mounting info-related route, register route modules
app.use('/api/info', infoRoutes);
app.use('/api/users', userRoutes);

// starting the express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
