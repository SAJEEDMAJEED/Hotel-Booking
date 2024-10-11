const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const rateLimit = require('./middleware/rateLimit');
const cors = require('cors');
const indexRouter = require('./routes/index'); // Main versioned router

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(rateLimit);

// Versioned API endpoint
app.use(`/${process.env.API_VERSION}/`, indexRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
