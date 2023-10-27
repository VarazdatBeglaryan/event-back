import Users from '../models/user.model.js';

class UserController {
    constructor () {}

    static async getUser(req, res) {
        const user = await Users.findById(req.userId);
        if (user) {
            const entitzeUser = user.entitize();
            return res.status(200).send({user: entitzeUser});
        }
    }
}

export default UserController;