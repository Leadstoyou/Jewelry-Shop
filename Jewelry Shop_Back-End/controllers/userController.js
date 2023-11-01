import { validationResult, check } from "express-validator";
import { userRepository } from "../repositories/indexRepository.js";
import HttpStatusCode from "../constant/HttpStatusCode.js";

const userGetAllUsersController = async (req, res) => {
  try {
    const allUsers = await userRepository.userGetAllUsersRepository();
    if (!allUsers.success) {
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: allUsers.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: allUsers.message,
      data: allUsers.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userSearchController = async (req, res) => {
  let { page = 1, size, search = "", role, status, block } = req.query;
  if (page !== undefined && isNaN(page)) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
      status: "ERROR",
      message: "Invalid 'page' value. It should be a number.",
    });
  }

  if (size !== undefined && isNaN(size)) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
      status: "ERROR",
      message: "Invalid 'size' value. It should be a number.",
    });
  }
  try {
    if (page !== undefined) {
      page = parseInt(page);
    }

    if (size !== undefined) {
      size = parseInt(size);
    }

    if (role !== undefined) {
      role = parseInt(role);
    }

    if (status !== undefined) {
      status = JSON.parse(status);
    }

    if (block !== undefined) {
      block = JSON.parse(block);
    }
    let filteredUsers = await userRepository.userSearchRepository({
      size,
      page,
      search,
      role,
      status,
      block,
    });

    const { total, users } = filteredUsers.data;
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: "Get search successfully",
      data: {
        size,
        page,
        search,
        role,
        status,
        block,
        total,
        data: users,
      },
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userChangePasswordController = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const errors = validationResult(req);
  check("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .withMessage(
      "Password must contain at least one number, one lowercase letter, and one uppercase letter"
    )
    .run(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
      status: "ERROR",
      errors: errors.array(),
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
      status: "ERROR",
      message: "Password and confirm password do not match.",
    });
  }
  try {
    const userId = req.user.userId;
    const updatedUser = await userRepository.userChangePasswordRepository({
      userId,
      oldPassword,
      newPassword,
    });
    if (!updatedUser.success) {
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userViewProfileController = async (req, res) => {
  try {
    const userInfoId = req.user.userId;
    const userInfo = await userRepository.userViewProfileRepository(userInfoId);
    if (!userInfo.success) {
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: userInfo.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: userInfo.message,
      data: userInfo.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userViewProfileDetailController = async (req, res) => {
  try {
    const userInfoId = req.query.userId;
    const userInfo = await userRepository.userViewProfileDetailRepository(
      userInfoId
    );
    if (!userInfo.success) {
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: userInfo.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: userInfo.message,
      data: userInfo.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userUpdateProfileController = async (req, res) => {
  const {
    userName,
    userPhoneNumber,
    userGender,
    userAddress,
    userAge,
    userAvatar,
  } = req.body;

  try {
    const userId = req.user.userId;
    const updatedUser = await userRepository.userUpdateProfileRepository({
      userId,
      userName,
      userPhoneNumber,
      userGender,
      userAddress,
      userAge,
      userAvatar,
    });

    if (!updatedUser) {
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.NOT_FOUND,
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userUpdateRoleController = async (req, res) => {
  const { newRole, userId } = req.body;
  try {
    const userRole = req.user.userRole;
    const updatedUser = await userRepository.userUpdateRoleRepository({
      userId,
      newRole,
      userRole,
    });

    if (!updatedUser.success) {
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userUpdateStatusController = async (req, res) => {
  const { newStatus, userId } = req.body;
  try {
    const userRole = req.user.userRole;
    const updatedUser = await userRepository.userUpdateStatusRepository({
      userId,
      newStatus,
      userRole,
    });

    if (!updatedUser.success) {
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userUpdateBlockController = async (req, res) => {
  const { newBlock, userId } = req.body;
  try {
    const userRole = req.user.userRole;
    const updatedUser = await userRepository.userUpdateBlockRepository({
      userId,
      newBlock,
      userRole,
    });

    if (!updatedUser.success) {
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userUpdateByAdminController = async (req, res) => {
  const { newRole, newStatus, newBlock, userId } = req.body;
  try {
    const userRole = req.user.userRole;
    const updatedUser = await userRepository.userUpdateByAdminRepository({
      userId,
      newRole,
      newStatus,
      newBlock,
      userRole,
    });

    if (!updatedUser.success) {
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

export default {
  userGetAllUsersController,
  userSearchController,
  userChangePasswordController,
  userUpdateProfileController,
  userUpdateRoleController,
  userUpdateStatusController,
  userUpdateBlockController,
  userViewProfileController,
  userUpdateByAdminController,
  userViewProfileDetailController,
};
