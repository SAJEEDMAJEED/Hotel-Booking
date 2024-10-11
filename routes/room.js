const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const auth = require('../middleware/auth');

router.post('/', auth, roomController.addRoom);

router.get('/', roomController.getRooms);

module.exports = router;
