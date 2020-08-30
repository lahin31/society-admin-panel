const AuthService = require("../services/auth");

exports.postLogin = async (req, res) => {
	try {
		const email = req.body.emailVal;
    const password = req.body.passwordVal;
    const result = await AuthService.Login(email, password);
    const { message, adminId, accessToken, expiresIn, refreshToken } = result;

    return res.status(200).json({
      message,
      adminId,
      accessToken,
      expiresIn,
      refreshToken,
    }); 
	} catch(err) {
		return res.status(500).json({
      error: err,
    });
	}
}