import { User } from "../models/indexModel.js";
import Exception from "../constant/Exception.js";
import bcrypt from "bcrypt";
import { jwtService } from "../services/indexService.js"

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
      const accessToken = await jwtService.generalAccessToken(existingUser);
      const refreshToken = await jwtService.generalRefreshToken(existingUser);
      resolve({
        ...existingUser.toObject(),
        password: "Not show",
        status: "OK",
        message: "SUCCESS",
        accessToken,
        refreshToken,
      });
    } catch (exception) {
      reject(exception);
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
        userAvatar,
        userRole: 2,
        isActive: true,
      });
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
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await User.findOneAndUpdate(
        { userEmail },
        {
          ...(userName && { userName }),
          ...(userPhoneNumber && { userPhoneNumber }),
          ...(userGender &&
            ["Male", "Female"].includes(userGender) && { userGender }),
          ...(userAddress && { userAddress }),
          ...(userAge > 0 && { userAge }),
          ...(userAvatar && { userAvatar }),
        },
        { new: true }
      ).exec();
      resolve({
        ...existingUser._doc,
      });
    } catch (error) {
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

const userUpdateStatusRepository = async ({ userEmail, newStatus, userRole }) => {
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

export default {
  userLoginRepository,
  userRegisterRepository,
  userChangePasswordRepository,
  userUpdateProfileRepository,
  userUpdateRoleRepository,
  userUpdateStatusRepository,
};
