import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { requestError, createToken } from '../../helpers';
import { User } from '../../models';


const { SECRET_KEY_REFRESH = "" } = process.env;

const refresh = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
  try {
    const { refreshToken } = req.body;
    const { id } = jwt.verify(refreshToken, SECRET_KEY_REFRESH)as JwtPayload & { id: string };
    const user = await User.findById(id);
    if (!user || user.refreshToken !== refreshToken) {
      throw requestError(401, "Token expired");
    }
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      createToken(id);

    await User.findByIdAndUpdate(id, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(requestError(401, error.message));
  }
};

export default refresh;
