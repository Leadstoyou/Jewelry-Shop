import { validationResult } from "express-validator";

import { userRepository } from "../repositories/indexRepository.js";

import { jwtService } from "../services/indexService.js"

import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const userLoginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { userEmail, userPassword } = req.body;
  try {
    const existingUser = await userRepository.userLoginRepository({
      userEmail,
      userPassword,
    });

    res.cookie('accessToken', existingUser.accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true, 
      secure: false ,
      sameSite: 'Strict',
    });

    res
      .status(HttpStatusCode.OK)
      .json({ message: "Login user success", data: existingUser });
  } catch (exception) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};

const refreshAccessTokenController = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const result = await jwtService.refreshTokenServices(refreshToken);
    if (result.status === "OK") {
      res.status(HttpStatusCode.OK).json({
        message: "Access token renewed successfully",
        accessToken: result.accessToken,
      });
    } else {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Unable to renew access token",
      });
    }
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const userLogoutController = async (req, res) => {
  try {
      res.clearCookie('refreshToken')
      return res.status(HttpStatusCode.OK).json({
          status: 'OK',
          message: 'Logout successfully'
      })
  } catch (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
          message: error
      })
  }
}

const userRegisterController = async (req, res) => {
  const {
    userName,
    userEmail,
    userPassword,
    userPhoneNumber,
    userGender,
    userAddress,
    userAge,
    userAvatar,
  } = req.body;

  try {
    const user = await userRepository.userRegisterRepository({
      userName,
      userEmail,
      userPassword,
      userPhoneNumber,
      userGender,
      userAddress,
      userAge,
      userAvatar,
    });
    res
      .status(HttpStatusCode.CREATE_OK)
      .json({ message: "POST register users", data: user });
  } catch (exception) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};

const userChangePasswordController = async (req, res) => {
  const { userEmail, oldPassword, newPassword } = req.body;
  try {
    const updatedUser = await userRepository.userChangePasswordRepository({
      userEmail,
      oldPassword,
      newPassword,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Password changed successfully",
      data: updatedUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
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
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "User not found" });
    }

    return res
      .status(HttpStatusCode.OK)
      .json({ message: "Profile updated", data: updatedUser });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
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
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "User not found" });
    }

    return res
      .status(HttpStatusCode.OK)
      .json({ message: "Role updated", data: updatedUser });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
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

    return res
      .status(HttpStatusCode.OK)
      .json({ message: "Status updated", data: updatedUser });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};

export default {
  userLoginController,
  userRegisterController,
  userChangePasswordController,
  userUpdateProfileController,
  userUpdateRoleController,
  userUpdateStatusController,
  refreshAccessTokenController,
  userLogoutController
};
