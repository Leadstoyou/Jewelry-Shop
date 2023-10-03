import { validationResult } from "express-validator";
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
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};

const userSearchController = async (req, res) => {
  let { page = 1, size = 6, searchString = "", searchRole = 2 } = req.query;
  size = size >= 6 ? 6 : size;
  try {
    const searchRoleNumber = parseInt(searchRole);

    let filteredUsers = await userRepository.userSearchRepository({
      size,
      page,
      searchString,
      searchRole,
    });
    return res.status(200).json({
      message: "Get search successfully",
      size,
      page,
      searchString: searchString,
      searchRole: searchRoleNumber,
      data: filteredUsers,
    });
  } catch (exception) {
    return res.status(400).json({ message: exception.message });
  }
};

const userLoginController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: errors.array(),
      });
    }

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
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.cookie("refreshToken", loginUser.data.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
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
    const result = await userRepository.refreshTokenRepository(refreshToken);
    if (!result) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: result.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: result.message,
      data: result.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      message: exception.message,
    });
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
    const logoutUser = await userRepository.userLogoutRepository(
      cookie.refreshToken
    );
    if (!logoutUser.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: logoutUser.message,
      });
    }
    res.clearCookie("accessToken", { httpOnly: true, secure: true });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: logoutUser.message,
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

    if (!registerUser.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: registerUser.message,
      });
    }

    return res.status(HttpStatusCode.CREATE_OK).json({
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
  const { userEmail } = req.params;
  try {
    const result = await userRepository.verifyEmailRepository(userEmail);
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

const userChangePasswordController = async (req, res) => {
  const { userEmail, oldPassword, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      message: "Password and confirm password do not match.",
    });
  }
  try {
    const updatedUser = await userRepository.userChangePasswordRepository({
      userEmail,
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

const userUpdateProfileController = async (req, res) => {
  const {
    userEmail,
    userName,
    userPhoneNumber,
    userGender,
    userAddress,
    userAge,
    userAvatar,
  } = req.body;

  try {
    const updatedUser = await userRepository.userUpdateProfileRepository({
      userEmail,
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
  const { userEmail, newRole } = req.body;
  try {
    const userRole = req.user.userRole;
    const updatedUser = await userRepository.userUpdateRoleRepository({
      userEmail,
      newRole,
      userRole,
    });

    if (!updatedUser) {
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
  const { userEmail, newStatus } = req.body;
  try {
    const userRole = req.user.userRole;
    const updatedUser = await userRepository.userUpdateStatusRepository({
      userEmail,
      newStatus,
      userRole,
    });

    if (!updatedUser) {
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

const userForgotPasswordController = async (req, res) => {
  const { userEmail } = req.query;
  if (!userEmail) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      message: "Missing email!",
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
  const { newPassword, token } = req.body;
  if (!newPassword || !token) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "ERROR",
      message: "Missing password",
    });
  }
  try {
    const result = await userRepository.userResetPasswordRepository(
      token,
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

export default {
  userGetAllUsersController,
  userSearchController,
  userLoginController,
  userRegisterController,
  userChangePasswordController,
  userUpdateProfileController,
  userUpdateRoleController,
  userUpdateStatusController,
  refreshAccessTokenController,
  userLogoutController,
  userForgotPasswordController,
  userResetPasswordController,
  verifyEmailController,
};
