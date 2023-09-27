import { User } from "../models/index.js";
import Exception from "../exceptions/Exception.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (isMatched) {
      const token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          // expiresIn: '60' //1 minutes
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

const register = async ({
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
}) => {
  const existingUser = await User.findOne({ email }).exec();
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
    userRole: userRole ?? 1,
    isActive: isActive ?? true,
  });
  return {
    ...newUser._doc,
    userPassword: "Not show",
  };
};

const changePassword = async ({ userEmail, oldPassword, newPassword }) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    const isMatched = await bcrypt.compare(oldPassword, existingUser.password);
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
    throw new Exception(Exception.INPUT_STUDENT_ERROR);
  }
};

export default { login, register, changePassword };
