import { body } from "express-validator";

export const serviceValidator = [
  body("service_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("service_name is required")
    .isString()
    .withMessage("service_name must be a string"),

  body("service_group")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("service_group is required")
    .isString()
    .withMessage("service_group must be a string"),

  body("categories")
    .isArray({ min: 1 })
    .withMessage("categories must be a non-empty array"),

  body("categories.*.category_id")
    .isInt({ min: 1 })
    .withMessage("category_id must be a positive integer"),

  body("categories.*.price")
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),
];
