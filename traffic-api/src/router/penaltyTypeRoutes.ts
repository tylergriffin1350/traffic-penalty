import express from "express";
import {
    createPenaltyType,
    deletePenaltyType,
    getPenaltyTypeById,
    getPenaltyTypes,
    updatePenaltyType
} from "../controller/penaltyTypeController";
import {validateData} from "../middleware/validationMiddleware";
import {createPenaltyTypeSchema} from "../schemas/penalitySchemas";
import {authMiddleware} from "../middleware/authMiddleware";

const penaltyTypeRouter = express.Router();
penaltyTypeRouter.post("/", validateData(createPenaltyTypeSchema), createPenaltyType);
penaltyTypeRouter.get("/", getPenaltyTypes);
penaltyTypeRouter.get("/:id", getPenaltyTypeById);
penaltyTypeRouter.put("/:id", validateData(createPenaltyTypeSchema), updatePenaltyType);
penaltyTypeRouter.delete("/:id", deletePenaltyType);

export default (router: express.Router) => {
    router.use("/penaltyType", authMiddleware, penaltyTypeRouter);
    return router;
}