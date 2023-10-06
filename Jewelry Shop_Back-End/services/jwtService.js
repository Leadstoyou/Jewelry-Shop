import jwt from "jsonwebtoken";

const generalAccessToken = async (userId, userRole) => {
  const accessToken = jwt.sign(
    {
      userId: userId,
      userRole: userRole,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "10000",
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
      expiresIn: "60000",
    }
  );
  return refreshToken;
};

const refreshToken = async () => {

}

export default {
  generalAccessToken,
  generalRefreshToken,
  refreshToken
};
