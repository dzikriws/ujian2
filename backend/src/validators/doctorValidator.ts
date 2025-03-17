import { body } from "express-validator";

export const doctorValidator = [
  body("doctor_name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("doctor_name is required")
    .isString()
    .withMessage("doctor_name must be a string"),

  body("address")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("address is required")
    .isString()
    .withMessage("address must be a string"),

  body("city")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("city is required")
    .isString()
    .withMessage("city must be a string"),

  body("country")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("country is required")
    .isString()
    .withMessage("country must be a string"),

  body("kategori")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("kategori is required")
    .isString()
    .withMessage("kategori must be a string"),

  body("contact_phone")
    .trim()
    .notEmpty()
    .withMessage("contact_phone is required")
    .isString()
    .withMessage("contact_phone must be a string"),
];