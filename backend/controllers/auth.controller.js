import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import errorHandler from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, 'User already exists'));
    }
    const hashedPassword = bcrypt.hashSync(password.toString(), 10);
    const newUser = new User({username,email,password: hashedPassword});
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordCorrect = bcrypt.compareSync(password.toString(), user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('access_token', token, { httpOnly: true }).status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      timestamp: new Date().getTime(),
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      const {password, ...rest} = user._doc
      const expiresIn = new Date(Date.now() + 1000 * 60 * 60 * 24)
      res.cookie('access_token', token, { httpOnly: true, expires: expiresIn }).status(200).json(rest)
    }
    else {
      const generatedPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      const hashedPassword = bcrypt.hashSync(generatedPassword.toString(), 10)
      const newUser = new User({
        username: req.body.name.split(' ').join('').toLowerCase(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      })
      await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      const {password, ...rest} = newUser._doc
      const expiresIn = new Date(Date.now() + 1000 * 60 * 60 * 24)
      res.cookie('access_token', token, { httpOnly: true, expires: expiresIn }).status(200).json(rest)
    }
  } catch (error) {
    next(error)
  }
}



