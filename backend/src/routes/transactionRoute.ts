import {
  getTransactions,
  getTransaction,
  createTransaction,
} from "../controllers/transactionController";
import { Router } from "express";
import { transactionValidator } from "../validators/transactionValidator";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.get("/", getTransactions);
router.get("/:transaction_id", getTransaction);
router.post("/", transactionValidator, validateRequest, createTransaction);

export default router;
