//* Ini Import
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
//* Ini Config
import config from "../../config/auth.config";
//* Ini Database
import db from "../../models";
const { User, RefreshToken } = db;
//* Export
export const signIn = (req: Request, res: Response) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(
      async (user: {
        password: string;
        id: any;
        getRoles: () => Promise<any>;
        username: any;
        email: any;
      }) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: config.jwtExpiration
        });

        const refreshToken = await RefreshToken.createToken(user);

        const authorities: string[] = [];
        user.getRoles().then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }

          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            refreshToken: refreshToken
          });
        });
      }
    )
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
    });
};
