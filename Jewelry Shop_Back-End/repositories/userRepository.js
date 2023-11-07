import { User } from "../models/indexModel.js";
import Exception from "../constant/Exception.js";
import SuccessConstants from "../constant/SuccessConstants.js";
import bcrypt from "bcrypt";
import { jwtService } from "../services/indexService.js";
import jwt from "jsonwebtoken";

const userGetAllUsersRepository = async () => {
  try {
    const allUsers = await User.find({});
    if (!allUsers || allUsers.length === 0) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }
    return {
      success: true,
      message: SuccessConstants.GET_ALL_USERS_SUCCESS,
      data: allUsers,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const userSearchRepository = async ({
  page,
  size,
  search,
  role,
  status,
  block,
}) => {
  try {
    const matchQuery = {
      $or: [
        {
          userName: { $regex: `.*${search}.*`, $options: "i" },
        },
        {
          userEmail: { $regex: `.*${search}.*`, $options: "i" },
        },
      ],
    };
    if (role != undefined) {
      matchQuery.userRole = role;
    }

    if (status != undefined) {
      matchQuery.isActive = status;
    }

    if (block != undefined) {
      matchQuery.isDelete = block;
    }
    const totalUsers = await User.countDocuments(matchQuery);
    if (!size) {
      size = totalUsers;
    }

    if (totalUsers == 0) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    let filteredUsers = await User.aggregate([
      {
        $match: matchQuery,
      },
      { $skip: (page - 1) * size },
      { $limit: size },
    ]);

    if (!filteredUsers) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    return {
      success: true,
      message: SuccessConstants.GET_USER_SUCCESS,
      data: {
        total: totalUsers,
        users: filteredUsers,
      },
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
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
      existingUser.createVerifyToken();
      await existingUser.save();
      return {
        success: false,
        message: Exception.USER_IS_NOT_ACTIVE,
        userData: existingUser,
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

    const { userRole, isDelete, isActive, ...userData } =
      updatedUser.toObject();
    return {
      success: true,
      message: SuccessConstants.LOGIN_SUCCESS,
      data: {
        ...userData,
        userPassword: "Not show",
        accessToken,
      },
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const refreshAccessTokenRepository = async (refreshToken) => {
  try {
    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decode) => {
        if (err instanceof jwt.TokenExpiredError) {
          reject({
            success: false,
            message: Exception.REFRESH_TOKEN_EXPIRED,
          });
        } else if (err) {
          reject({
            success: false,
            message: Exception.REFRESH_TOKEN_INVALID,
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
      message: SuccessConstants.REFRESH_ACCESS_TOKEN_SUCCESS,
      data: newAccessToken,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
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
      message: SuccessConstants.LOGOUT_SUCCESS,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
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
        "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg",
      userRole: 2,
      isActive: false,
    });

    newUser.createVerifyToken();
    await newUser.save();

    return {
      success: true,
      message: SuccessConstants.REGISTER_SUCCESS,
      data: {
        ...newUser._doc,
        userPassword: "Not show",
      },
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const verifyEmailRepository = async (userVerifyResetToken) => {
  try {
    const existingUser = await User.findOne({ userVerifyResetToken }).exec();
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    existingUser.isActive = true;
    existingUser.userVerifyAt = Date.now();
    existingUser.userVerifyResetToken = undefined;
    existingUser.userVerifyResetExpires = undefined;
    await existingUser.save();

    return {
      success: true,
      message: SuccessConstants.VERIFY_EMAIL_SUCCESS,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
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
    return {
      success: true,
      message: SuccessConstants.FORGOT_PASSWORD_SUCCESS,
      data: existingUser,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userResetPasswordRepository = async (
  userPasswordResetToken,
  newPassword
) => {
  try {
    const existingUser = await User.findOne({
      userPasswordResetToken,
      userPasswordResetExpires: { $gt: Date.now() },
    }).exec();

    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_WRONG_RESET_PASSWORD_TOKEN,
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
      message: SuccessConstants.RESET_PASSWORD_SUCCESS,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userChangePasswordRepository = async ({
  userId,
  oldPassword,
  newPassword,
}) => {
  try {
    const existingUser = await User.findById(userId);
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

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userPassword: hashedPassword },
      { new: true }
    ).exec();

    return {
      success: true,
      message: SuccessConstants.CHANGE_PASSWORD_SUCCESS,
      data: {
        ...updatedUser.toObject(),
        userPassword: "Not show",
      },
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userViewProfileRepository = async (userId) => {
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }
    return {
      success: true,
      message: SuccessConstants.VIEW_PROFILE_SUCCESS,
      data: existingUser,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userViewProfileDetailRepository = async (userId) => {
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }
    return {
      success: true,
      message: SuccessConstants.VIEW_PROFILE_SUCCESS,
      data: existingUser,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userUpdateProfileRepository = async ({
  userId,
  userName,
  userPhoneNumber,
  userGender,
  userAddress,
  userAge,
  userAvatar,
}) => {
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }
    const updateFields = {
      ...(userName && { userName }),
      ...(userPhoneNumber && { userPhoneNumber }),
      ...(userGender &&
        ["Male", "Female"].includes(userGender) && { userGender }),
      ...(userAddress && { userAddress }),
      ...(userAge > 0 && { userAge }),
      ...(userAvatar && { userAvatar }),
    };
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    }).exec();
    if (!updatedUser) {
      return {
        success: false,
        message: Exception.UPDATE_USER_ERROR,
      };
    }

    return {
      success: true,
      message: SuccessConstants.UPDATE_PROFILE_SUCCESS,
      data: {
        ...updatedUser._doc,
      },
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userUpdateRoleRepository = async ({ userId, newRole, userRole }) => {
  try {
    if (userRole !== 0) {
      return {
        success: false,
        message: Exception.PERMISSION_DENIED,
      };
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userRole: newRole },
      { new: true }
    ).exec();
    if (!updatedUser) {
      return {
        success: false,
        message: Exception.UPDATE_USER_ERROR,
      };
    }

    return {
      success: true,
      message: SuccessConstants.UPDATE_ROLE_SUCCESS,
      data: {
        ...updatedUser.toObject(),
        userPassword: "Not shown",
      },
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userUpdateStatusRepository = async ({ userId, newStatus, userRole }) => {
  try {
    if (userRole !== 0) {
      return {
        success: false,
        message: Exception.PERMISSION_DENIED,
      };
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive: newStatus },
      { new: true }
    ).exec();
    if (!updatedUser) {
      return {
        success: false,
        message: Exception.UPDATE_USER_ERROR,
      };
    }

    return {
      success: true,
      message: SuccessConstants.UPDATE_STATUS_SUCCESS,
      data: { ...updatedUser.toObject(), userPassword: "Not shown" },
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userUpdateBlockRepository = async ({ userId, newBlock, userRole }) => {
  try {
    if (userRole !== 0) {
      return {
        success: false,
        message: Exception.PERMISSION_DENIED,
      };
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isDelete: newBlock },
      { new: true }
    ).exec();
    if (!updatedUser) {
      return {
        success: false,
        message: Exception.UPDATE_USER_ERROR,
      };
    }

    return {
      success: true,
      message: SuccessConstants.UPDATE_BLOCK_SUCCESS,
      data: { ...updatedUser.toObject(), userPassword: "Not shown" },
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userUpdateByAdminRepository = async ({
  userId,
  newRole,
  newStatus,
  newBlock,
  userRole,
}) => {
  try {
    if (userRole !== 0) {
      return {
        success: false,
        message: Exception.PERMISSION_DENIED,
      };
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    if (newRole !== undefined) {
      existingUser.userRole = newRole;
    }

    if (newStatus !== undefined) {
      existingUser.isActive = newStatus;
    }

    if (newBlock !== undefined) {
      existingUser.isDelete = newBlock;
    }

    const updatedUser = await existingUser.save();

    return {
      success: true,
      message: SuccessConstants.UPDATE_SUCCESS,
      data: {
        ...updatedUser.toObject(),
        userPassword: "Not shown",
      },
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

export default {
  userGetAllUsersRepository,
  userSearchRepository,
  userLoginRepository,
  refreshAccessTokenRepository,
  userLogoutRepository,
  userRegisterRepository,
  verifyEmailRepository,
  userForgotPasswordRepository,
  userResetPasswordRepository,
  userChangePasswordRepository,
  userViewProfileRepository,
  userUpdateProfileRepository,
  userUpdateRoleRepository,
  userUpdateStatusRepository,
  userUpdateBlockRepository,
  userUpdateByAdminRepository,
  userViewProfileDetailRepository,
};
