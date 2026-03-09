import express from "express";
import {createRole, deleteRole, getRoleById, getRoles, updateRole} from "../controller/roleController";
import {validateData} from "../middleware/validationMiddleware";
import {createRoleSchema} from "../schemas/userSchemas";
import {authMiddleware} from "../middleware/authMiddleware";

const roleRouter = express.Router();

roleRouter.post("/", validateData(createRoleSchema), createRole);
roleRouter.get("/", getRoles);
roleRouter.get("/:id", getRoleById);
roleRouter.put("/:id", updateRole);
roleRouter.delete("/:id", deleteRole);

export default (router: express.Router) => {
    router.use("/role", authMiddleware, roleRouter);
    return router;
}