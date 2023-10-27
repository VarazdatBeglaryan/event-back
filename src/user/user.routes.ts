import UserController from './user.controller.js';

const getUser = async function (req, res) {
  return UserController.getUser(req, res);
};

export default { getUser };
