const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const signupSchema = Joi.object({
    userName: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
});

exports.signUp = async (req, res) =>{
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const {userName, password} = req.body;
        const newUser = new User({userName, password});
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

exports.logIn = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = User.findOne({userName});
        if(!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400).json({error: "Invalid credential"});
        }
        const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET);
        res.json({token})
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
};