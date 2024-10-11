const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

// Route to create a payment intent
router.post('/create-payment-intent', auth, paymentController.createPaymentIntent);

module.exports = router;
