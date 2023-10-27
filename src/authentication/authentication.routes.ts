import AuthenticationController from './authentication.controller.js';

const createUser = async (req, res) => {
  return await AuthenticationController.createUser(req, res);
};

const loginUser = async (req, res) => {
  return await AuthenticationController.loginUser(req, res);
};

export default { createUser, loginUser };
