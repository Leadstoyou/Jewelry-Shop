import jwt from "jsonwebtoken";

const generalAccessToken = async (userId, userEmail, userRole) => {
  const accessToken = jwt.sign(
    {
      userId: userId,
      userRole: userRole,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "1 hour",
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
      expiresIn: "30 days",
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
