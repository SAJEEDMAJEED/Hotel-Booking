const express = require('express');
const router = express.Router();

// Routes
router.use('/api/auth', require('./auth'));
router.use('/api/rooms', require('./room'));
router.use('/api/bookings', require('./booking'));
router.use('/api/payments', require('./payment'));

module.exports = router;