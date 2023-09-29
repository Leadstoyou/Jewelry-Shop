import { userRepository } from "../repositories/indexRepository.js";
import { validationResult } from "express-validator";
import {generalAccessToken,generalRefreshToken} from "../services/jwtService.js"
const userLoginService = ({ userEmail, userPassword }) => {
  return new Promise(async (resolve, reject) => {
      try {
        const existingUser = await User.findOne({ userEmail }).exec();
          if (!existingUser) {
              resolve({
                  status: 'ERR',
                  message: `The user is not defined `
              })
          }
          const isMatched = await bcrypt.compareSync(userPassword, existingUser.userPassword)
          if (!isMatched) {
              resolve({
                  status: 'ERR',
                  message: 'The password  is incorrect',
              })
          }
          const accessToken = await generalAccessToken(existingUser)
          const refreshToken = await generalRefreshToken(existingUser)
          resolve({
            ...existingUser.toObject(),
              password: "Not show",
              status: 'OK',
              message: 'SUCCESS',
              accessToken, refreshToken
          })
      } catch (exception) {
          reject(exception)
      }
  })
}

const userRegisterService = async (req, res) => {};

const userChangePasswordService = async (req, res) => {};

const userUpdateProfileService = async (req, res) => {};

export default {
  userLoginService,
  userRegisterService,
  userChangePasswordService,
  userUpdateProfileService,
};
