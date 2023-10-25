import AuthenticationController from './authentication.controller.js';

const createUser = async (req, res) => {
    return await AuthenticationController.createUser(req, res);
}

export default {createUser}