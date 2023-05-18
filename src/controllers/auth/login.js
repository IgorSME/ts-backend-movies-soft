const bcrypt = require("bcrypt");
const { requestError, createToken } = require("../../helpers");
const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw requestError(401, "Email or password is wrong");
  }
  const { accessToken, refreshToken } = createToken(user.id);
  await User.findByIdAndUpdate(user.id, { accessToken, refreshToken });

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
    refreshToken,
  });
};

module.exports = login;
