const Admin = require("../../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const genAccTkn = require("../../helpers/genAccessToken");

let refreshTokens = [];

exports.Login = async (email, password) => {
  const admin = await Admin.findOne({
    email,
  });

  if (!admin) {
    return {
      message: "Email or Password isn't matched",
    };
  }

  if (admin.password !== password) {
    return {
      message: "Email or Password isn't matched",
    };
  }

  const token = genAccTkn.generateAccessToken(admin);
  const refreshToken = jwt.sign(
    {
      adminId: admin._id,
      email: admin.email,
    },
    process.env.REFRESH_TOKEN_SECRET
  );
  // saving refresh tokens in an array
  refreshTokens.push(refreshToken);
  return {
    message: "Authenticate successfull",
    adminId: admin._id,
    accessToken: token,
    expiresIn: "10h",
    refreshToken,
  };
};
