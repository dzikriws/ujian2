import { login } from "../controllers/userController";
import { Router } from "express";
import { loginValidator } from "../validators/userValidator";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post("/", loginValidator, validateRequest, login);

export default router;
