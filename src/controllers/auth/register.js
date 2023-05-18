const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { requestError, createToken } = require("../../helpers");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw requestError(401, `User with email:${email} already exist`);
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  const { accessToken, refreshToken } = createToken(newUser.id);
  await User.findByIdAndUpdate(newUser._id, { accessToken, refreshToken });

  res.status(201).json({
    user: {
      username,
      email,
    },
    accessToken,
    refreshToken,
  });
};

module.exports = register;
