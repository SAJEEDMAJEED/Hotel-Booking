const Room = require('../models/room');
const Joi = require('joi');

const roomSchema = Joi.object({
    roomType: Joi.string().required(),
    price: Joi.number().required(),
    amenities: Joi.array().items(Joi.string()).required(),
});

exports.addRoom = async (req, res) => {
    const { error } = roomSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json(room)
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ availability: true });  // Only available rooms
        res.json(rooms)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}