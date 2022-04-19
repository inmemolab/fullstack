import { Router } from "express";

import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middlewares/verifySignUp";

import { signUp } from "../controllers/auth/signup.controller";
import { signIn } from "../controllers/auth/signin.controller";
import { forgotPassword } from "../controllers/auth/forgotpassword.controller";
import { changePassword } from "../controllers/auth/changepassword.controller";
import { refreshToken } from "../controllers/auth/refreshtoken.controller";
//* Link routes
const authRouter = Router();

authRouter.post("/signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], signUp);
authRouter.post("/signin", signIn);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/change-password", changePassword);
authRouter.post("/refreshtoken", refreshToken);

//* Export
export default authRouter;
