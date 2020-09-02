const jwt = require("jsonwebtoken");

// generating access token
exports.generateAccessToken = (admin) => {
  return jwt.sign(
    {
      adminId: admin.id,
      email: admin.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10h",
    }
  );
};
