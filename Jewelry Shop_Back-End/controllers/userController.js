import { validationResult } from "express-validator";

import { userRepository } from "../repositories/index.js";

import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { userEmail, userPassword } = req.body;
  try {
    const existingUser = await userRepository.login({
      userEmail,
      userPassword,
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

const register = async (req, res) => {
  const {
    userName,
    userEmail,
    userPassword,
    userPhoneNumber,
    userGender,
    userAddress,
    userAge,
    userAvatar,
    userRole,
    isActive,
  } = req.body;

  try {
    const user = await userRepository.register({
      userName,
      userEmail,
      userPassword,
      userPhoneNumber,
      userGender,
      userAddress,
      userAge,
      userAvatar,
      userRole: userRole ?? 1,
      isActive: isActive ?? true,
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

const changePassword = async (req, res) => {
  const { userEmail, oldPassword, newPassword } = req.body;
  try {
    const updatedUser = await userRepository.changePassword({
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

export default {
  login,
  register,
  changePassword,
};
