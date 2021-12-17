const UserController = require("../controller/UserController");

const checkAdminPermission = async (req) => {
  if (req.userId) {
    const userFound = await UserController.UserModel.findOne({
      id: req.userId,
    });

    if (userFound && userFound.isAdmin) {
      return true;
    }
  }

  throw new Error("User does not have admin permissions");
};

const PermissionsService = {
  checkAdminPermission,
};

module.exports = PermissionsService;
