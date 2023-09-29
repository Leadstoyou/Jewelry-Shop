import { User } from "../models/indexModel.js";
import Exception from "../exceptions/Exception.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLoginRepository = async ({ userEmail, userPassword }) => {
  const existingUser = await User.findOne({ userEmail }).exec();
  if (existingUser) {
    const isMatched = await bcrypt.compare(
      userPassword,
      existingUser.userPassword
    );
    if (isMatched) {
      const token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30 days",
        }
      );
      return {
        ...existingUser.toObject(),
        password: "Not show",
        token,
      };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
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
  userAvatar,
}) => {
  const existingUser = await User.findOne({ userEmail }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
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
  return {
    ...newUser._doc,
    userPassword: "Not show",
  };
};

const userChangePasswordRepository = async ({
  userEmail,
  oldPassword,
  newPassword,
}) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    const isMatched = await bcrypt.compare(
      oldPassword,
      existingUser.userPassword
    );
    if (!isMatched) {
      throw new Exception(Exception.WRONG_OLD_PASSWORD);
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
      ...updatedUser.toObject(),
      userPassword: "Not show",
    };
  } catch (exception) {
    throw new Exception(Exception.INPUT_DATA_ERROR);
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
}) => {
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
    return {
      ...existingUser._doc,
    };
  } catch (error) {
    throw new Exception(Exception.INPUT_ERROR, { message: error.message });
  }
};

const userUpdateRoleRepository = async ({ userEmail, newRole, userRole }) => {
  try {
    if (userRole !== 0) {
      throw new Exception(Exception.PERMISSION_DENIED);
    }
    const updatedUser = await User.findOneAndUpdate(
      { userEmail },
      { userRole: newRole },
      { new: true }
    ).exec();

    return {
      ...updatedUser.toObject(),
      userPassword: "Not shown",
    };
  } catch (error) {
    throw new Exception(Exception.INPUT_ERROR, { message: error.message });
  }
};

const userUpdateStatusRepository = async ({
  userEmail,
  newStatus,
  userRole,
}) => {
  try {
    if (userRole !== 0) {
      throw new Exception(Exception.PERMISSION_DENIED);
    }
    const updatedUser = await User.findOneAndUpdate(
      { userEmail },
      { isActive: newStatus },
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new Exception(Exception.USER_NOT_FOUND);
    }

    return {
      ...updatedUser.toObject(),
      userPassword: "Not shown",
    };
  } catch (error) {
    throw new Exception(Exception.INPUT_ERROR, { message: error.message });
  }
};

export default {
  userLoginRepository,
  userRegisterRepository,
  userChangePasswordRepository,
  userUpdateProfileRepository,
  userUpdateRoleRepository,
  userUpdateStatusRepository
};
