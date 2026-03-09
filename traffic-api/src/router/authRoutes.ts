import express from "express";

import {getMe, getUsers, login, refreshToken, register, updateUser} from "../controller/authController";
import {validateData} from "../middleware/validationMiddleware";
import {userLoginSchema, userRegistrationSchema} from "../schemas/userSchemas";
import {authMiddleware} from "../middleware/authMiddleware";

const authRouter = express.Router();
authRouter.post("/register", validateData(userRegistrationSchema), register);
authRouter.post("/login", validateData(userLoginSchema), login);
authRouter.post("/refresh", refreshToken);
authRouter.get("/me", getMe);
authRouter.get("/users",getUsers);
authRouter.put("/users/:id", updateUser);


export default () => {
    authRouter.use("/auth", authRouter);
    return authRouter;
}


