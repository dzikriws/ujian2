import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController";
import { Router } from "express";
import { doctorValidator } from "../validators/doctorValidator";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.get("/", getDoctors);
router.post("/", doctorValidator, validateRequest, createDoctor);
router.put("/:doctor_id", doctorValidator, validateRequest, updateDoctor);
router.delete("/:doctor_id", deleteDoctor);

export default router;
