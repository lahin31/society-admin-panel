const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const Admin = require("../models/admin");

// exports.postSignUp = async (req, res) => {
//   try {
//     const existingUser = await Admin.findOne({
//       email: req.body.email,
//     });

//     if (existingUser) {
//       return res.status(409).json({
//         message: "Sorry email doesn't exist",
//       });
//     }
//     const hashedPassword = await bcrypt.hash(req.body.password, 12);
//     const admin = new Admin({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     const result = await admin.save();
//     res.status(200).json({
//       message: "Amin Created",
//       result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: err,
//     });
//   }
// }

exports.postLogin = async (req, res) => {
	try {
		const email = req.body.emailVal;
    const password = req.body.passwordVal;
    const admin = await Admin.findOne({
      email
    });

    if (!admin) {
      return res.status(400).json({
        error: "Email or Password isn't matched lahin",
      });
		}

    if (admin.password !== password) {
      return res.status(400).json({
        error: "Email or Password isn't matched lahin",
      });
		}
		
    const token = generateAccessToken(admin);
    const refreshToken = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
      },
      process.env.REFRESH_TOKEN_SECRET
    );
    // saving refresh tokens in an array
    refreshTokens.push(refreshToken);
    return res.status(200).json({
      message: "Authenticate successfull",
      adminId: admin._id,
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
function generateAccessToken(admin) {
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
}