import { body } from "express-validator";

export const loginValidator = [
  body("username")
    .if(body("email").not().exists())
    .notEmpty()
    .withMessage("Username or email is required")
    .isString()
    .withMessage("Username must be a string"),

  body("email")
    .if(body("username").not().exists())
    .notEmpty()
    .withMessage("Username or email is required")
    .isEmail()
    .withMessage("Email must be a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),
];
