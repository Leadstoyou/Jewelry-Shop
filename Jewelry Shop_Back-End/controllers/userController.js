import { validationResult, check } from "express-validator";
import { userRepository } from "../repositories/indexRepository.js";
import HttpStatusCode from "../constant/HttpStatusCode.js";

const userGetAllUsersController = async (req, res) => {
  try {
    const allUsers = await userRepository.userGetAllUsersRepository();
    if (!allUsers.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: allUsers.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: allUsers.message,
      data: allUsers.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userSearchController = async (req, res) => {
  let { page = 1, size, search = "", role, status, block } = req.query;
  if (page !== undefined && isNaN(page)) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "ERROR",
      message: "Invalid 'page' value. It should be a number.",
    });
  }

  if (size !== undefined && isNaN(size)) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
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
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userLoginController = async (req, res) => {
  const errors = validationResult(req);
  check("userEmail").isEmail().withMessage("Invalid email format").run(req);
  check("userPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .withMessage(
      "Password must contain at least one number, one lowercase letter, and one uppercase letter"
    )
    .run(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      errors: errors.array(),
    });
  }
  try {
    const { userEmail, userPassword } = req.body;
    const loginUser = await userRepository.userLoginRepository({
      userEmail,
      userPassword,
    });

    if (!loginUser.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: loginUser.message,
      });
    }
    res.cookie("accessToken", loginUser.data.accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: true,
      sameSite: "None",
    });

    res.cookie("refreshToken", loginUser.data.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: loginUser.message,
      data: loginUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

const refreshAccessTokenController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      message: "No refresh token in cookies",
    });
  }

  try {
    const result = await userRepository.refreshAccessTokenRepository(
      refreshToken
    );
    if (!result.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: result.message,
      });
    }

    res.cookie("accessToken", result.data, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: true,
      sameSite: "None",
    });

    return result.data;
  } catch (exception) {
    return (req, res, next) => {
      res.clearCookie("accessToken", { httpOnly: false, secure: true });
      res.clearCookie("refreshToken", { httpOnly: true, secure: true });
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: exception.message });
    };
  }
};

const userLogoutController = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      message: "No refresh token in cookies",
    });
  }
  try {
    res.clearCookie("accessToken", { httpOnly: false, secure: true });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    res.clearCookie("cart_token", { httpOnly: true, secure: true });
    const logoutUser = await userRepository.userLogoutRepository(
      cookie.refreshToken
    );
    if (!logoutUser.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: logoutUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: "Logout success",
    });
  } catch (exception) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userRegisterController = async (req, res) => {
  const {
    userName,
    userEmail,
    userPassword,
    confirmPassword,
    userPhoneNumber,
    userGender,
    userAddress,
    userAge,
  } = req.body;
  const errors = validationResult(req);
  check("userEmail").isEmail().withMessage("Invalid email format").run(req);
  check("userPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .withMessage(
      "Password must contain at least one number, one lowercase letter, and one uppercase letter"
    )
    .run(req);

  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      errors: errors.array(),
    });
  }

  if (userPassword !== confirmPassword) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      message: "Password and confirm password do not match.",
    });
  }
  try {
    const registerUser = await userRepository.userRegisterRepository({
      userName,
      userEmail,
      userPassword,
      userPhoneNumber,
      userGender,
      userAddress,
      userAge,
    });

    if (registerUser.success == false) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: registerUser.message,
      });
    }

    return res.status(HttpStatusCode.CREATED).json({
      status: "OK",
      message: registerUser.message,
      data: registerUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

const verifyEmailController = async (req, res) => {
  const { userVerifyResetToken } = req.params;
  try {
    const result = await userRepository.verifyEmailRepository(
      userVerifyResetToken
    );
    if (!result.success) {
      return res.status(HttpStatusCode.OK).json({
        status: "ERROR",
        message: result.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: result.message,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userForgotPasswordController = async (req, res) => {
  const { userEmail } = req.query;
  if (!userEmail) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      message: "Missing email!",
    });
  }

  const errors = validationResult(req);
  check("userEmail").isEmail().withMessage("Invalid email format").run(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      errors: errors.array(),
    });
  }

  try {
    const forgotPasswordUser =
      await userRepository.userForgotPasswordRepository(userEmail);
    if (!forgotPasswordUser.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: forgotPasswordUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: forgotPasswordUser.message,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userResetPasswordController = async (req, res) => {
  const { newPassword, userPasswordResetToken } = req.body;
  if (!newPassword) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "ERROR",
      message: "Missing password",
    });
  }
  if (!userPasswordResetToken) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "ERROR",
      message: "Invalid Token",
    });
  }
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
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      errors: errors.array(),
    });
  }

  try {
    const result = await userRepository.userResetPasswordRepository(
      userPasswordResetToken,
      newPassword
    );
    if (!result.success) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        status: "ERROR",
        message: result.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: result.message,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
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
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      errors: errors.array(),
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
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
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
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
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: userInfo.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: userInfo.message,
      data: userInfo.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
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
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: userInfo.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: userInfo.message,
      data: userInfo.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
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
      return res.status(HttpStatusCode.NOT_FOUND).json({
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
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
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
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
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
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
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
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
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

export default {
  userGetAllUsersController,
  userSearchController,
  userLoginController,
  refreshAccessTokenController,
  userLogoutController,
  userRegisterController,
  verifyEmailController,
  userForgotPasswordController,
  userResetPasswordController,
  userChangePasswordController,
  userUpdateProfileController,
  userUpdateRoleController,
  userUpdateStatusController,
  userUpdateBlockController,
  userViewProfileController,
  userUpdateByAdminController,
  userViewProfileDetailController,
};
