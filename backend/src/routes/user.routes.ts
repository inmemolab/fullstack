import { Router } from "express";

import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt";
import { allAccess, userBoard, moderatorBoard, adminBoard } from "../controllers/user.controller";

//* Link routes
const userRouter = Router();

userRouter.get("/all", allAccess);

userRouter.get("/user", [verifyToken], userBoard);

userRouter.get("/mod", [verifyToken, isModerator], moderatorBoard);

userRouter.get("/admin", [verifyToken, isAdmin], adminBoard);

//* Export
export default userRouter;
