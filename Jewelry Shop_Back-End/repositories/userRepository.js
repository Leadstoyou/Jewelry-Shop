import { User } from "../models/indexModel.js";
import Exception from "../constant/Exception.js";
import constants from "../constant/constants.js";
import bcrypt from "bcrypt";
import { jwtService, cloudinaryService } from "../services/indexService.js";

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
<<<<<<< HEAD
        userAvatar: "https://th.bing.com/th/id/R.1257e9bf1162dab4f055837ac569b081?rik=G2s3vNi9Oa7%2bGg&pid=ImgRaw&r=0",
        userRole: 2,
        isActive: true,
=======
        userAvatar:
          userAvatar ||
          "https://th.bing.com/th/id/R.1257e9bf1162dab4f055837ac569b081?rik=G2s3vNi9Oa7%2bGg&pid=ImgRaw&r=0",
        userRole,
        isActive,
>>>>>>> main
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
  userRole,
  isActive,
}) => {
  return new Promise(async (resolve, reject) => {
<<<<<<< HEAD
    try {
      let userAvtUrl = null;
=======
    let userAvtUrl = null;
    try {
>>>>>>> main
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
<<<<<<< HEAD
=======
          ...(userRole && { userRole }),
          ...(isActive && { isActive }),
>>>>>>> main
        },
        { new: true }
      ).exec();
      resolve({
        ...existingUser._doc,
      });
    } catch (error) {
<<<<<<< HEAD
=======
      if (userAvtUrl) {
        cloudinaryService.deleteImageFromCloudinary(userAvtUrl);
      }
>>>>>>> main
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
<<<<<<< HEAD
=======
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
>>>>>>> main
};

export default {
  userLoginRepository,
  userRegisterRepository,
  userChangePasswordRepository,
  userUpdateProfileRepository,
  userUpdateRoleRepository,
  userUpdateStatusRepository,
<<<<<<< HEAD
=======
  searchUsers,
>>>>>>> main
};
