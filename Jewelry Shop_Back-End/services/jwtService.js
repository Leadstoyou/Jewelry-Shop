import jwt from "jsonwebtoken";

const generalAccessToken = async (userId, userRole) => {
  const accessToken = jwt.sign(
    {
      userId: userId,
      userRole: userRole,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "50000000",
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
      expiresIn: "700000000",
    }
  );
  return refreshToken;
};

export default {
  generalAccessToken,
  generalRefreshToken,
};