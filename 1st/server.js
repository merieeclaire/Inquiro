require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const corsOptions = require('./config/corsOptions');

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const refreshRoute = require('./routes/refresh');
app.use('/refresh', refreshRoute);


// 🔹 Import token logger
const tokenLogger = require('./middleware/tokenLogger');

const PORT = process.env.PORT || 3600;

//connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// 🔹 Use tokenLogger only in development
if (process.env.NODE_ENV === 'development') {
    app.use(tokenLogger);
}

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use('/api/personal', require('./routes/api/personalInfo'));
app.use('/api/school', require('./routes/api/schoolInfo'));
app.use('/api/college', require('./routes/api/collegeInfo'));



app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
