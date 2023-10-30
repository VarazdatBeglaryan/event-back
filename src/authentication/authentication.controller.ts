import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from '../../config.js';

class AuthenticationController {
  constructor() {}

  static async createUser(req, res) {
    try {
      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        return res.status(400).send({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      });

      await user.save();
      res.status(201).send({ message: 'User created successfully', user });
    } catch (error) {
      console.log('error - ', error);
      res.status(400).send({ error: 'Something wen wrong' });
    }
  }

  static async loginUser(req, res) {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        const isMatch = await bcrypt.compare(
          req.body.password,
          existingUser.password
        );

        if (isMatch) {
            const payload = {id: existingUser._id};
            const token = jwt.sign(payload, secret, { expiresIn: '24h' });
            return res.status(200).send({ token });
        }
        return res.status(400).send({ error: 'Invalid email or password' });
      }
    } catch (err) {
        console.log('error - ', err);
        res.status(400).send({ error: 'Something wen wrong' });
    }
  }

  static async logout(req, res) {
    
  }
}

export default AuthenticationController;
