import jwt from "jsonwebtoken";

const generalAccessToken = async (payload) => {
  const accessToken = jwt.sign(
    {
      data: payload,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "10 days",
    }
  );
  return accessToken;
};

const generalRefreshToken = async (payload) => {
  const refreshToken = jwt.sign(
    {
      data: payload,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "60 days",
    }
  );
  return refreshToken;
};

const refreshTokenServices = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, payload) => {
        if (err) {
          resolve({
            status: "ERROR",
            message: "The authentication",
          });
        }
        const accessToken = await generalAccessToken(payload);
        resolve({
          status: "OK",
          message: "SUCCESS",
          accessToken,
        });
      });
    } catch (err) {
      reject(err);
    }
  });
};
export default {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenServices,
};
