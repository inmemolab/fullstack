//* Ini Router
import { Router, Request, Response } from "express";
//* Ini routes
const apiRouter = Router();
import auth from "./auth.routes";
import user from "./user.routes";
//* Secure call
apiRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});
apiRouter.use("/api/auth", auth);
apiRouter.use("/api/users", user);

// mock
apiRouter.use("/api/test", async (req: Request, res: Response) => {
  const body = [
    {
      name: "wahaha",
      age: 16
    },
    {
      name: "wahaha",
      age: 16
    },
    {
      name: "wahaha",
      age: 16
    }
  ];
  const data = {
    data: body,
    code: 0,
    msg: ""
  };
  res.end(JSON.stringify(data));
});

//* Export
export default apiRouter;
