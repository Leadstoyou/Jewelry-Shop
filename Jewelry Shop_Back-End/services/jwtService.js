import jwt from "jsonwebtoken";

const generalAccessToken = async (userId, userRole) => {
  const accessToken = jwt.sign(
    {
      userId: userId,
      userRole: userRole,
    },
    process.env.ACCESS_TOKEN,
    {

      expiresIn: "1 day",

    }
  );
  return accessToken;
};

const generalRefreshToken = async (userId) => {
  const refreshToken = jwt.sign(
    {
      userId: userId
    },
    process.env.REFRESH_TOKEN,
    {

      expiresIn: "3 days",

    }
  );
  return refreshToken;
};

export default {
  generalAccessToken,
  generalRefreshToken,
};