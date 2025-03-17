import { body } from "express-validator";

export const serviceCategoryValidator = [
  body("category_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("category_name is required")
    .isString()
    .withMessage("category_name must be a string"),
];
