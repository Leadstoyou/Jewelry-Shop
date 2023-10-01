import { validationResult } from "express-validator";

import { userRepository } from "../repositories/indexRepository.js";

import HttpStatusCode from "../constant/HttpStatusCode.js";
import { User } from "../models/indexModel.js";

const userGetAllUsersController = async (req, res) => {
  try {
    const allUsers = await userRepository.userGetAllUsersRepository();
    res.status(200).json({
      message: "Get all users successfully",
      data: allUsers,
    });
  } catch (error) {
    res.status(400).json({ message: exception.message });
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
    res.status(200).json({
      message: "Get search successfully",
      size,
      page,
      searchString: searchString,
      searchRole: searchRoleNumber,
      data: filteredUsers,
    });
  } catch (exception) {
    res.status(400).json({ message: exception.message });
  }
};

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

    res.cookie("refreshToken", existingUser.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(HttpStatusCode.OK).json({
      message: "Login user success",
      status: "OK",
      data: existingUser,
    });
  } catch (exception) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};

const refreshAccessTokenController = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: "No refresh token in cookies",
    });
  }
  try {
    const result = await userRepository.refreshTokenRepository(
      cookie.refreshToken
    );

    return res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: error });
  }
};

const userLogoutController = async (req, res) => {
  const cookie = req.cookies;
  console.log(req.cookies);
  if (!cookie || !cookie.refreshToken) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: "No refresh token in cookies",
    });
  }
  try {
    await userRepository.userLogoutRepository(cookie.refreshToken);
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    res.clearCookie("accessToken", { httpOnly: true, secure: true });
    return res.status(HttpStatusCode.OK).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: error });
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
    userAvatar,
  } = req.body;
  if (userPassword !== confirmPassword) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Password and confirm password do not match.",
    });
  }
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

const verifyEmailController = async (req, res) => {
  const { userEmail } = req.params;

  try {
    const result = await userRepository.verifyEmailRepository(userEmail);
    return res.status(HttpStatusCode.OK).json({
      success: result.success,
      message: result.message,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const userChangePasswordController = async (req, res) => {
  const { userEmail, oldPassword, newPassword,confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Password and confirm password do not match.",
    });
  }
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

const userForgotPasswordController = async (req, res) => {
  const { userEmail } = req.query;

  if (!userEmail) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Missing email",
    });
  }

  try {
    await userRepository.userForgotPasswordRepository(userEmail);
    return res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Password reset instructions sent to your email.",
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const userResetPasswordController = async (req, res) => {
  const { newPassword, token } = req.body;
  if (!newPassword || !token) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Missing email",
    });
  }
  try {
    const result = await userRepository.userResetPasswordRepository(
      token,
      newPassword
    );
    return res.status(HttpStatusCode.OK).json({
      success: result.success,
      message: result.message,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
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
  verifyEmailController
};
