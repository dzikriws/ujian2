import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController";
import { Router } from "express";
import { serviceValidator } from "../validators/serviceValidator";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.get("/", getServices);
router.post("/", serviceValidator, validateRequest, createService);
router.put("/:service_id", serviceValidator, validateRequest, updateService);
router.delete("/:service_id", deleteService);

export default router;
