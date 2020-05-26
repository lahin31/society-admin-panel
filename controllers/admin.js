const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");

exports.postLogin = async (req, res) => {
	try {
		const email = req.body.email;
    const password = req.body.password;
    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(401).json({
        error: "Email or Password isn't matched",
      });
		}

    const isEqual = await bcrypt.compare(password, admin.password);

    if (!isEqual) {
      return res.status(500).json({
        error: "Email or Password isn't matched",
      });
		}
		
		const token = generateAccessToken(student);
    const refreshToken = jwt.sign(
      {
        userId: admin._id,
        email: admin.email,
      },
      process.env.REFRESH_TOKEN_SECRET
    );
    // saving refresh tokens in an array
    refreshTokens.push(refreshToken);
    return res.status(200).json({
      message: "Authenticate successfull",
      userId: admin._id,
      accessToken: token,
      expiresIn: "10h",
      refreshToken,
    }); 
	} catch(err) {
		return res.status(500).json({
      error: err,
    });
	}
}

// generating access token
function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10h",
    }
  );
}