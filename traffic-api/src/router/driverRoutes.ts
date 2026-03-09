import express from "express";
import {
  createDriver,
  getDriverById,
  getDriverByLicenseNumber,
  getDriverByPhoneNumber,
  getDrivers,
} from "../controller/driverController";
import {
  addPenalty,
  getPenaltyByDriverId,
} from "../controller/penaltyController";
import { validateData } from "../middleware/validationMiddleware";
import { createDriverSchema } from "../schemas/driverSchemas";
import { createPenaltySchema } from "../schemas/penalitySchemas";
import { authMiddleware } from "../middleware/authMiddleware";

const driverRoute = express.Router();

driverRoute.post("/", validateData(createDriverSchema), createDriver);
driverRoute.get("/", getDrivers);
driverRoute.get("/by-license/:licenseNumber", getDriverByLicenseNumber);
driverRoute.get("/by-phone/:phoneNumber", getDriverByPhoneNumber);
driverRoute.get("/by-id/:driverId", getDriverById);
driverRoute.post(
  "/:driverId/penalty",
  validateData(createPenaltySchema),
  addPenalty
);
driverRoute.get("/:driverId/penalty", getPenaltyByDriverId);

export default (router: express.Router) => {
  router.use("/driver", authMiddleware, driverRoute);
  return router;
};
