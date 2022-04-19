//* Ini Import
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
//* Ini Config
import configMail from "../../config/mail.config";
//* Ini Database
import db from "../../models";
const { User, Role } = db;
const Op = db.Sequelize.Op;

const token = "123456789"; //jwt.sign(payload, config.jwtSecret, { expiresIn: "15min" });
const link = `http://localhost:8081/recovery?token=${token}`;
const mail = {
  from: "enmemolab@gmail.com",
  to: "enmemolab@gmail.com",
  subject: "This email is intended for password recovering",
  html: `<b>Please access this link for recovering your password => ${link}</b>`
};

interface MailtrapTransporter {
  host: string;
}

const transporter = nodemailer.createTransport({
  host: configMail.mailHost,
  secure: false,
  port: 587,
  auth: {
    user: configMail.mailUser,
    pass: configMail.mailPassword
  }
} as MailtrapTransporter);

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
            await transporter.sendMail(mail);
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(async () => {
          await transporter.sendMail(mail);
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
    });
};
