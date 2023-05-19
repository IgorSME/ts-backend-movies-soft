import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { requestError, createToken } from "../../helpers";
import { User } from "../../models";
import { IUserSchema } from "../../types/appType";

const login = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const user:IUserSchema | null = await User.findOne({ email });
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

export default login;
