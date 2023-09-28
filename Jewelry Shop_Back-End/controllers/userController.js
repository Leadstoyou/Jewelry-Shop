import { validationResult } from "express-validator";

import { userRepository } from "../repositories/indexRepository.js";

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
    const existingUser = await userRepository.userLoginController({
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
    const user = await userRepository.userRegisterController({
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
    const updatedUser = await userRepository.userChangePasswordController({
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
    const updatedUser = await userRepository.userUpdateProfileController({
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
}

export default {
 userLoginController,
 userRegisterController,
 userChangePasswordController,
 userUpdateProfileController
};

