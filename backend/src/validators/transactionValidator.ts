import { body } from "express-validator";

export const transactionValidator = [
  body("doctor_id")
    .notEmpty()
    .withMessage("doctor_id is required")
    .isInt({ min: 1 })
    .withMessage("doctor_id must be a positive integer"),
  body("patient_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("patient_name is required")
    .isString()
    .withMessage("patient_name must be a string"),
  body("service_id")
    .notEmpty()
    .withMessage("service_id is required")
    .isInt({ min: 1 })
    .withMessage("service_id must be a positive integer"),
  body("date").optional().isDate().withMessage("date must be a valid date"),
  body("tax_rate")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("tax_rate must be a positive number"),
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("username is required")
    .isString()
    .withMessage("username must be a string"),
  body("details")
    .isArray({ min: 1 })
    .withMessage("details must be a non-empty array"),
  body("details.*.category_id")
    .isInt({ min: 1 })
    .withMessage("category_id must be a positive integer"),
  body("details.*.qty")
    .isInt({ min: 1 })
    .withMessage("qty must be a positive integer"),
];
