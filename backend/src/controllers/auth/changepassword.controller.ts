//* Ini Import
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
//* Ini Database
import db from "../../models";
const { User, Role } = db;
const Op = db.Sequelize.Op;
//* Export
export const changePassword = (req: Request, res: Response) => {
  //*
};
