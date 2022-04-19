//* Ini Import
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
//* Ini Config
import config from "../../config/auth.config";
//* Ini Database
import db from "../../models";
const { RefreshToken } = db;
//* Export
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken === null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    const refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    console.log(refreshToken);

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request"
      });
      return;
    }

    const user = await refreshToken.getUser();
    const newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
