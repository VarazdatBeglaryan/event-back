import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

class AuthenticationController {
    constructor() {
    }

    static async createUser(req, res) {
        const existingUser = User.findOne({ email: req.body.email });
        console.log(existingUser)
        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' });
        }
      
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        })

        await user.save();
        res.status(201).send({ message: 'User created successfully', user });
    }
}

export default AuthenticationController;