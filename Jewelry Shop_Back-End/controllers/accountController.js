import { validationResult, check } from "express-validator";
import { userRepository } from "../repositories/indexRepository.js";
import HttpStatusCode from "../constant/HttpStatusCode.js";

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
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
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
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
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
      response: HttpStatusCode.OK,
      status: "OK",
      message: loginUser.message,
      data: loginUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

const refreshAccessTokenController = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
      status: "ERROR",
      message: "No refresh token in cookies",
    });
  }
  try {
    const result = await userRepository.refreshAccessTokenRepository(
      refreshToken
    );
    if (!result.success) {
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
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
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        response: HttpStatusCode.INTERNAL_SERVER_ERROR,
        status: "ERROR",
        message: exception.message,
      });
    };
  }
};

const userLogoutController = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
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
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: logoutUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: "Logout success",
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
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
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
      status: "ERROR",
      errors: errors.array(),
    });
  }

  if (userPassword !== confirmPassword) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
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
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: registerUser.message,
      });
    }

    return res.status(HttpStatusCode.CREATED).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: registerUser.message,
      data: registerUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
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
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: result.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: result.message,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
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
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
      status: "ERROR",
      errors: errors.array(),
    });
  }
  try {
    const forgotPasswordUser =
      await userRepository.userForgotPasswordRepository(userEmail);
    if (!forgotPasswordUser.success) {
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: forgotPasswordUser.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: forgotPasswordUser.message,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.INTERNAL_SERVER_ERROR,
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userResetPasswordController = async (req, res) => {
  const { newPassword, userPasswordResetToken } = req.body;
  if (!newPassword) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
      status: "ERROR",
      message: "Missing password",
    });
  }
  if (!userPasswordResetToken) {
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.UNAUTHORIZED,
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
    return res.status(HttpStatusCode.OPK).json({
      response: HttpStatusCode.UNAUTHORIZED,
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
      return res.status(HttpStatusCode.OK).json({
        response: HttpStatusCode.BAD_REQUEST,
        status: "ERROR",
        message: result.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      response: HttpStatusCode.OK,
      status: "OK",
      message: result.message,
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
  userLoginController,
  refreshAccessTokenController,
  userLogoutController,
  userRegisterController,
  verifyEmailController,
  userForgotPasswordController,
  userResetPasswordController,
};
