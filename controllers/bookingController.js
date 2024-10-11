const Booking = require('../models/booking');
const Room = require('../models/room');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Joi = require('joi');

// Define the booking validation schema
const bookingSchema = Joi.object({
    roomId: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    amount: Joi.number().integer().min(1).required(),
    currency: Joi.string().length(3).required(),
});

// Function to create a booking with Stripe payment
exports.createBooking = async (req, res) => {
    // Validate the booking data
    const { error } = bookingSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { roomId, startDate, endDate, amount, currency } = req.body;

    try {
        // Check if the room exists and is available
        const room = await Room.findById(roomId);
        if (!room || !room.availability) {
            return res.status(400).json({ error: 'Room not available' });
        }

        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents
            currency,
        });

        // Create the new booking if payment intent is created
        const booking = new Booking({
            user: req.user.userId,
            room: roomId,
            startDate,
            endDate,
            status: 'pending',  // Set status as 'pending' until payment is confirmed
        });

        await booking.save();

        // Set the room to unavailable and save
        room.availability = false;
        await room.save();

        // Return the booking and the payment client secret for front-end confirmation
        res.status(201).json({
            booking,
            clientSecret: paymentIntent.client_secret,
            message: 'Booking created. Please confirm payment to complete the reservation.',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
