import { body, query } from "express-validator";

export const validatorArrays = {
  userSignUp: [
    body("givenNames")
      .exists()
      .isLength({ min: 1, max: 100 })
      .withMessage(
        "User's given name or names (first name and middle names if exist) are mandatory and must be between 1 and 100 characters long."
      ),
    body("familyNames")
      .optional()
      .isLength({ min: 1, max: 100 })
      .withMessage(
        "User's family name or names (last names) and must be between 1 and 100 characters long."
      ),
    body("email")
      .optional()
      .isEmail()
      .withMessage("User's email must have a valid email format."),
    body("phoneNumber")
      .exists()
      .isMobilePhone("any")
      .withMessage(
        "User's mobile phone number is mandatory, must be a valid phone number, must start with '+', must have no separators between digits and must have a country code supplied (e.g. +573000000000)."
      ),
    body("password")
      .exists()
      .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "User's password is mandatory and must contain at least 6 characters, including at least 1 lowercase character, 1 uppercase character, 1 number digit character and 1 symbol character."
      ),
    body("countryCode")
      .exists()
      .isISO31661Alpha2()
      .withMessage(
        "Country code is mandatory and must be a valid ISO 3166-1 alpha-2 officially assigned country code."
      ),
    body("cityName")
      .optional()
      .isLength({ min: 1, max: 100 })
      .withMessage("City name must be between 1 and 100 characters long."),
    body("birthDate")
      .optional()
      .isDate()
      .isBefore(new Date().toISOString())
      .withMessage(
        "User's birth date must be a valid date before this present moment."
      ),
    body("gender")
      .optional()
      .isIn(["Male", "Female", "Other", "Undefined"])
      .withMessage(
        "Gender must be one of these values: Male, Female, Other, Undefined."
      ),
  ],
  userSignIn: [
    body("email")
      .optional()
      .isEmail()
      .withMessage("User's email must have a valid email format."),
    body("phoneNumber")
      .optional()
      .isMobilePhone("any")
      .withMessage(
        "User's mobile phone number is mandatory, must be a valid phone number, must start with '+', must have no separators between digits and must have a country code supplied (e.g. +573000000000)."
      ),
    body("password")
      .exists()
      .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "User's password is mandatory and must contain at least 6 characters, including at least 1 lowercase character, 1 uppercase character, 1 number digit character and 1 symbol character."
      ),
  ],
  retrieveNearbyRestaurants: [
    query("lng")
      .exists()
      .toFloat()
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude is mandatory and must be a valid Longitude"),
    query("lat")
      .exists()
      .toFloat()
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude is mandatory and must be a valid Latitude"),
  ],
};
