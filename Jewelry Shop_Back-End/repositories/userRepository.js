import { User } from "../models/indexModel.js";
import Exception from "../constant/Exception.js";
import constants from "../constant/constants.js";
import bcrypt from "bcrypt";
import {
  jwtService,
  cloudinaryService,
  sendEmailService,
} from "../services/indexService.js";

import jwt from "jsonwebtoken";

const userGetAllUsersRepository = async () => {
  try {
    const allUsers = await User.find({});
    return {
      success: true,
      message: "Get all users successfully!",
      data: allUsers,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const userSearchRepository = async ({
  page,
  size,
  searchString,
  searchRole,
}) => {
  page = parseInt(page);
  size = parseInt(size);
  const searchRoleNumber = parseInt(searchRole);
  const matchQuery = {
    $or: [
      {
        userName: { $regex: `.*${searchString}.*`, $options: "i" },
      },
      {
        userEmail: { $regex: `.*${searchString}.*`, $options: "i" },
      },
    ],
  };

  if (searchRole) {
    matchQuery.userRole = searchRoleNumber;
  }

  let filteredUsers = await User.aggregate([
    {
      $match: matchQuery,
    },
    { $skip: (page - 1) * size },
    { $limit: size },
  ]);

  return filteredUsers;
};

const userLoginRepository = async ({ userEmail, userPassword }) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    if (!existingUser.isActive) {
      return {
        success: false,
        message: Exception.USER_IS_NOT_ACTIVE,
      };
    }

    const isMatched = bcrypt.compareSync(
      userPassword,
      existingUser.userPassword
    );
    if (!isMatched) {
      return {
        success: false,
        message: Exception.WRONG_EMAIL_AND_PASSWORD,
      };
    }

    const accessToken = await jwtService.generalAccessToken(
      existingUser._id,
      existingUser.userRole
    );
    const refreshToken = await jwtService.generalRefreshToken(existingUser._id);

    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      { refreshToken },
      { new: true }
    );

    const {
      userPassword: removedUserPassword,
      userRole,
      ...userData
    } = updatedUser.toObject();
    return {
      success: true,
      message: constants.LOGIN_SUCCESSFUL,
      data: {
        ...userData,
        accessToken,
        refreshToken,
      },
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const refreshAccessTokenRepository = async (refreshToken) => {
  try {
    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decode) => {
        if (err instanceof jwt.TokenExpiredError) {
          reject({
            success: false,
            message: Exception.REFRESH_TOKEN_EXPRIED,
          });
        } else if (err) {
          reject({
            success: false,
            message: "Lỗi xác thực token: " + err.message,
          });
        } else {
          resolve(decode);
        }
      });
    });

    const existingUser = await User.findOne({
      _id: decodedToken.userId,
      refreshToken,
    });
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    const newAccessToken = await jwtService.generalAccessToken(
      existingUser._id,
      existingUser.userRole
    );

    return {
      success: true,
      message: constants.REFRESH_ACCESS_TOKEN_SUCCESS ,
      data: newAccessToken,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const updateRefreshTokenRepository = async (userId, refreshToken) => {
  try {
    const existingUser = await User.findOne({
      _id: userId,
      refreshToken,
    });

    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    const newAccessToken = await jwtService.generalRefreshToken(
      existingUser._id
    );

    return {
      success: true,
      message: "update refresh token successfully!",
      data: newAccessToken,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const userLogoutRepository = async (refreshToken) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { refreshToken },
      { refreshToken: "" },
      { new: true }
    );

    if (!updatedUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_REFRESH_TOKEN_IN_USER,
      };
    }
    return {
      success: true,
      message: "Logout successfully!",
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const userRegisterRepository = async ({
  userName,
  userEmail,
  userPassword,
  userPhoneNumber,
  userGender,
  userAddress,
  userAge,
}) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (existingUser) {
      return {
        success: false,
        message: Exception.USER_EXIST,
      };
    }

    const newUser = await User.create({
      userName,
      userEmail,
      userPassword,
      userPhoneNumber,
      userGender,
      userAddress,
      userAge,
      userAvatar:
        "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg",
      userRole: 2,
      isActive: false,
    });

    const hashedEmail = await bcrypt.hash(
      userEmail,
      parseInt(process.env.SALT_ROUNDS)
    );

    const verificationCodeLink = `${process.env.URL_SERVER}/verify/${userEmail}`;
    const emailSubject = "Xác minh tài khoản của bạn";
    const emailBody = `Xin chào ${userName},\n\nVui lòng nhấn vào liên kết sau để xác minh tài khoản của bạn:\n\n <a href="${verificationCodeLink}">Click Here!</a>`;
    sendEmailService.sendEmailService(userEmail, emailSubject, emailBody);

    return {
      success: true,
      message: "Register successfully",
      data: {
        ...newUser._doc,
        userPassword: "Not show",
      },
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const verifyEmailRepository = async (userEmail) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    existingUser.isActive = true;
    await existingUser.save();

    return {
      success: true,
      message: "Email verified successfully",
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const userChangePasswordRepository = async ({
  userEmail,
  oldPassword,
  newPassword,
}) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    const isMatched = await bcrypt.compare(
      oldPassword,
      existingUser.userPassword
    );
    if (!isMatched) {
      return {
        success: false,
        message: Exception.PASSWORD_NOT_MATCH,
      };
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUNDS)
    );

    const updatedUser = await User.findOneAndUpdate(
      { userEmail },
      { userPassword: hashedPassword },
      { new: true }
    ).exec();

    return {
      success: true,
      message: "Change password successfully!",
      data: {
        ...updatedUser.toObject(),
        userPassword: "Not show",
      },
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const userUpdateProfileRepository = async ({
  userEmail,
  userName,
  userPhoneNumber,
  userGender,
  userAddress,
  userAge,
  userAvatar,
  userRole,
  isActive,
}) => {
  let userAvtUrl = null;
  try {
    if (userAvatar) {
      userAvtUrl = await cloudinaryService.uploadProductImageToCloudinary(
        userAvatar,
        constants.CLOUDINARY_USER_AVATAR_IMG
      );
    }

    const updateFields = {
      ...(userName && { userName }),
      ...(userPhoneNumber && { userPhoneNumber }),
      ...(userGender &&
        ["Male", "Female"].includes(userGender) && { userGender }),
      ...(userAddress && { userAddress }),
      ...(userAge > 0 && { userAge }),
      ...(userAvtUrl && { userAvatar: userAvtUrl }),
      ...(userRole && { userRole }),
      ...(isActive && { isActive }),
    };

    const updatedUser = await User.findOneAndUpdate(
      { userEmail },
      updateFields,
      { new: true }
    ).exec();
    if (!updatedUser) {
      return {
        success: false,
        message: Exception.USER_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: "Update user successfully!",
      data: {
        ...updatedUser._doc,
      },
    };
  } catch (exception) {
    if (userAvtUrl) {
      cloudinaryService.deleteImageFromCloudinary(userAvtUrl);
    }
    throw new Exception(exception.message);
  }
};

const userUpdateRoleRepository = async ({ userEmail, newRole, userRole }) => {
  try {
    if (userRole !== 0) {
      return {
        success: false,
        message: Exception.PERMISSION_DENIED,
      };
    }

    const updatedUser = await User.findOneAndUpdate(
      { userEmail },
      { userRole: newRole },
      { new: true }
    ).exec();
    if (!updatedUser) {
      return {
        success: false,
        message: Exception.USER_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: "Update role successfully!",
      data: {
        ...updatedUser.toObject(),
        userPassword: "Not shown",
      },
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const userUpdateStatusRepository = async ({
  userEmail,
  newStatus,
  userRole,
}) => {
  try {
    if (userRole !== 0) {
      return {
        success: false,
        message: Exception.PERMISSION_DENIED,
      };
    }

    const updatedUser = await User.findOneAndUpdate(
      { userEmail },
      { isActive: newStatus },
      { new: true }
    ).exec();
    if (!updatedUser) {
      return {
        success: false,
        message: Exception.USER_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: "Update status successfully!",
      data: { ...updatedUser.toObject(), userPassword: "Not shown" },
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const userForgotPasswordRepository = async (userEmail) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    existingUser.createPasswordChangedToken();
    await existingUser.save();
    const resetToken = existingUser.userPasswordResetToken;
    const emailSubject = "Bạn forgot password";
    const resetLink = `${process.env.URL_SERVER}/resetPassword/${resetToken}`;
    const emailBody = `To reset your password, click the following link, link tồn tại trong 15p: <a href="${resetLink}">Click here!</a>`;
    await sendEmailService.sendEmailService(userEmail, emailSubject, emailBody);

    return {
      success: true,
      message: "Password reset instructions sent to your email.",
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const userResetPasswordRepository = async (token, newPassword) => {
  try {
    const existingUser = await User.findOne({
      userPasswordResetToken: token,
      userPasswordResetExpires: { $gt: Date.now() },
    }).exec();

    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_TOKEN_PASSWORD_IN_USER,
      };
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUNDS)
    );
    existingUser.userPassword = hashedPassword;
    existingUser.userPasswordChangedAt = Date.now();
    existingUser.userPasswordResetToken = undefined;
    existingUser.userPasswordResetExpires = undefined;
    await existingUser.save();

    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

export default {
  userGetAllUsersRepository,
  userSearchRepository,
  userLoginRepository,
  userLogoutRepository,
  userRegisterRepository,
  userChangePasswordRepository,
  userUpdateProfileRepository,
  userUpdateRoleRepository,
  userUpdateStatusRepository,
  refreshAccessTokenRepository,
  userForgotPasswordRepository,
  userResetPasswordRepository,
  verifyEmailRepository,
  updateRefreshTokenRepository,
};
