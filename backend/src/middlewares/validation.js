import { body, param, validationResult } from "express-validator";

const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateUserRegisterRequest = [
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password with 6 or more characters required"),
  handleValidationErrors,
];

export const validateUserCreateProfileRequest = [
  body("firstName").isString().notEmpty().withMessage("First Name is required"),
  body("lastName").isString().notEmpty().withMessage("Last Name is required"),
  body("gender").isString().notEmpty().withMessage("Gender is required"),
  body("date").isDate().notEmpty().withMessage("First Name is required"),
  handleValidationErrors,
];

export const validateUserLogInRequest = [
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password with 6 or more characters required"),
  handleValidationErrors,
];
