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
    return allUsers;
  } catch (error) {
    throw error;
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
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await User.findOne({ userEmail }).exec();
      if (!existingUser) {
        resolve({
          status: "ERROR",
          message: Exception.CANNOT_FIND_USER,
        });
      }
      const isMatched = bcrypt.compareSync(
        userPassword,
        existingUser.userPassword
      );

      if (!isMatched) {
        resolve({
          status: "ERROR",
          message: Exception.WRONG_EMAIL_AND_PASSWORD,
        });
      }

      const accessToken = await jwtService.generalAccessToken(
        existingUser._id,
        existingUser.userEmail,
        existingUser.userRole
      );

      const refreshToken = await jwtService.generalRefreshToken(
        existingUser._id
      );

      await User.findByIdAndUpdate(
        existingUser._id,
        { refreshToken },
        { new: true }
      );

      const {
        userPassword: removedUserPassword,
        userRole,
        ...userData
      } = existingUser.toObject();
      resolve({
        ...userData,
        accessToken,
        refreshToken,
      });
    } catch (exception) {
      reject(exception);
    }
  });
};

const refreshTokenRepository = async (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
      const existingUser = await User.findOne({
        _id: decodedToken.userId,
        refreshToken,
      });

      if (!existingUser) {
        return reject("User not found");
      }

      const newAccessToken = await jwtService.generalAccessToken(
        existingUser._id,
        existingUser.userEmail,
        existingUser.userRole
      );

      return resolve({
        success: true,
        newAccessToken,
      });
    } catch (error) {
      return reject(error.message);
    }
  });
};

const userLogoutRepository = async (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { refreshToken },
        { refreshToken: "" },
        { new: true }
      );

      if (!updatedUser) {
        return reject("No user found with the provided refreshToken");
      }

      return resolve();
    } catch (error) {
      return reject(error.message);
    }
  });
};

const userRegisterRepository = async ({
  userName,
  userEmail,
  userPassword,
  userPhoneNumber,
  userGender,
  userAddress,
  userAge,
  userAvatar,
  userRole = 2,
  isActive = true,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await User.findOne({ userEmail }).exec();
      if (!!existingUser) {
        reject(new Exception(Exception.USER_EXIST));
      }
      const hashedPassword = await bcrypt.hash(
        userPassword,
        parseInt(process.env.SALT_ROUNDS)
      );
      const newUser = await User.create({
        userName,
        userEmail,
        userPassword: hashedPassword,
        userPhoneNumber,
        userGender,
        userAddress,
        userAge,
        userAvatar:
          "https://th.bing.com/th/id/R.1257e9bf1162dab4f055837ac569b081?rik=G2s3vNi9Oa7%2bGg&pid=ImgRaw&r=0",
        userRole: 2,
        isActive: false,
      });
      const verificationCodeLink = `<a href=${process.env.URL_SERVER}/users/verify>Click here</a>`;
      const emailSubject = "Xác minh tài khoản của bạn";
      const emailBody = `Xin chào ${userName},\n\nVui lòng nhấn vào liên kết sau để xác minh tài khoản của bạn:\n\n${verificationCodeLink}`;
      sendEmailService.sendEmailService(userEmail, emailSubject, emailBody);
      resolve({
        ...newUser._doc,
        userPassword: "Not show",
      });
    } catch (exception) {
      reject(exception);
    }
  });
};

const userChangePasswordRepository = async ({
  userEmail,
  oldPassword,
  newPassword,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await User.findOne({ userEmail }).exec();
      const isMatched = await bcrypt.compare(
        oldPassword,
        existingUser.userPassword
      );
      if (!isMatched) {
        reject(new Exception(Exception.WRONG_OLD_PASSWORD));
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
      resolve({
        ...updatedUser.toObject(),
        userPassword: "Not show",
      });
    } catch (exception) {
      reject(exception);
    }
  });
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
  return new Promise(async (resolve, reject) => {
    let userAvtUrl = null;
    try {
      if (userAvatar) {
        userAvtUrl = await cloudinaryService.uploadProductImageToCloudinary(
          userAvatar,
          constants.CLOUDINARY_USER_AVATAR_IMG
        );
      }
      const existingUser = await User.findOneAndUpdate(
        { userEmail },
        {
          ...(userName && { userName }),
          ...(userPhoneNumber && { userPhoneNumber }),
          ...(userGender &&
            ["Male", "Female"].includes(userGender) && { userGender }),
          ...(userAddress && { userAddress }),
          ...(userAge > 0 && { userAge }),
          ...(userAvtUrl && { userAvatar: userAvtUrl }),
          ...(userRole && { userRole }),
          ...(isActive && { isActive }),
        },
        { new: true }
      ).exec();
      resolve({
        ...existingUser._doc,
      });
    } catch (error) {
      if (userAvtUrl) {
        cloudinaryService.deleteImageFromCloudinary(userAvtUrl);
      }
      reject(new Exception(Exception.INPUT_ERROR, { message: error.message }));
    }
  });
};

const userUpdateRoleRepository = async ({ userEmail, newRole, userRole }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (userRole !== 0) {
        reject(new Exception(Exception.PERMISSION_DENIED));
      }
      const updatedUser = await User.findOneAndUpdate(
        { userEmail },
        { userRole: newRole },
        { new: true }
      ).exec();

      if (!updatedUser) {
        reject(new Exception(Exception.USER_NOT_FOUND));
      }

      resolve({
        ...updatedUser.toObject(),
        userPassword: "Not shown",
      });
    } catch (error) {
      reject(new Exception(Exception.INPUT_ERROR, { message: error.message }));
    }
  });
};

const userUpdateStatusRepository = async ({
  userEmail,
  newStatus,
  userRole,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (userRole !== 0) {
        reject(new Exception(Exception.PERMISSION_DENIED));
      }
      const updatedUser = await User.findOneAndUpdate(
        { userEmail },
        { isActive: newStatus },
        { new: true }
      ).exec();

      if (!updatedUser) {
        reject(new Exception(Exception.USER_NOT_FOUND));
      }

      resolve({
        ...updatedUser.toObject(),
        userPassword: "Not shown",
      });
    } catch (error) {
      reject(new Exception(Exception.INPUT_ERROR, { message: error.message }));
    }
  });
};
const searchUsers = async ({ username, onlyName }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = {
        $or: [
          { userName: new RegExp(username, "i") },
          ...(onlyName
            ? []
            : [
                { userAddress: new RegExp(username, "i") },
                { userEmail: new RegExp(username, "i") },
              ]),
        ],
      };

      const searchResult = await User.find(query).exec();
      if (searchResult.length === 0) {
        throw new Exception(Exception.USER_NOT_FOUND);
      }

      const formattedResults = searchResult.map((result) => {
        return { ...result.toObject(), userPassword: "Not shown" };
      });
      resolve(formattedResults);
    } catch (error) {
      reject(new Exception(Exception.INPUT_ERROR, { message: error.message }));
    }
  });
};

const userForgotPasswordRepository = async (userEmail) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (!existingUser) {
      throw new Error("User not found");
    }
    existingUser.createPasswordChangedToken();
    await existingUser.save();
    const resetToken = existingUser.userPasswordResetToken;
    const emailSubject = "Bạn forgot password";
    const resetLink = `${process.env.URL_SERVER}/resetPassword/${resetToken}`;
    const emailBody = `To reset your password, click the following link, link tồn tại trong 15p: ${resetLink}`;
    await sendEmailService.sendEmailService(userEmail, emailSubject, emailBody);
    return {
      success: true,
      message: "Password reset instructions sent to your email.",
    };
  } catch (exception) {
    throw exception;
  }
};

const userResetPasswordRepository = async (token, newPassword) => {
  try {
    console.log(token);
    const existingUser = await User.findOne({
      userPasswordResetToken : token,
      userPasswordResetExpires: { $gt: Date.now() },
    }).exec();
    if (!existingUser) {
      throw new Error("Invalid user reset token");
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
    throw exception;
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
  refreshTokenRepository,
  userForgotPasswordRepository,
  userResetPasswordRepository,
};
