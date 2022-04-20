//* Ini Import
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
//* Ini Database
import db from "../../models";
const { User, Role } = db;
const Op = db.Sequelize.Op;

//* Export
export const signUp = (req: Request, res: Response) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(async (user: { setRoles: (arg0: number[]) => Promise<any> }) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then((roles: number[]) => {
          user.setRoles(roles).then(async () => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(async () => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
    });
};
