import express from "express";
import roleRoutes from "./roleRoutes";
import driverRoutes from "./driverRoutes";
import authRoutes from "./authRoutes";
import penaltyTypeRoutes from "./penaltyTypeRoutes";

const router = express.Router();

export default () => {
    roleRoutes(router);
    penaltyTypeRoutes(router);
    driverRoutes(router);
    return router;
}