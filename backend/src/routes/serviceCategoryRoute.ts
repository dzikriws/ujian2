import {
  getServiceCategory,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
} from "../controllers/serviceCategoryController";
import { Router } from "express";
import { serviceCategoryValidator } from "../validators/serviceCategoryValidator";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.get("/", getServiceCategory);
router.post(
  "/",
  serviceCategoryValidator,
  validateRequest,
  createServiceCategory
);
router.put(
  "/:service_category_id",
  serviceCategoryValidator,
  validateRequest,
  updateServiceCategory
);
router.delete("/:service_category_id", deleteServiceCategory);

export default router;
