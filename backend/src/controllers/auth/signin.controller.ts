// ini Import
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// ini Config
import config from "../../config/auth.config";
// ini Database
import db from "../../models";
const { User, RefreshToken } = db;
// export
export const signIn = async (req: Request, res: Response) => {
  //recibimos la info de la app
  const username = req.body.username;
  // find user if exist
  User.findOne({ where: { username: username } })
    .then(
      async (userData: {
        password: string;
        id: any;
        getRoles: () => Promise<any>;
        username: any;
        email: any;
      }) => {
        // if no have user information
        if (!userData) {
          return res.status(404).send({ message: "User Not found." });
        }
        // if paswword is the same
        const passwordIsValid = bcrypt.compareSync(req.body.password, userData.password);
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        // token
        const token = jwt.sign({ id: userData.id }, config.secret, {
          expiresIn: config.jwtExpiration
        });
        // refresh token
        const refreshToken = await RefreshToken.createToken(userData);
        // roles
        const authorities: string[] = [];
        userData.getRoles().then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: userData.id,
            username: userData.username,
            email: userData.email,
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

export const AAAAAAAsignIn = (req: Request, res: Response) => {
  // find user if exist
  User.findOne({
    where: {
      username: req.body.params.username
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
        // if no have user information
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.params.password, user.password);

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

          const callData = {
            status: "200",
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              roles: authorities,
              accessToken: token,
              refreshToken: refreshToken
            }
          };

          res.json(callData);

          // res.status(200).send({
          //   id: user.id,
          //   username: user.username,
          //   email: user.email,
          //   roles: authorities,
          //   accessToken: token,
          //   refreshToken: refreshToken
          // });
        });
      }
    )
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
    });
};
