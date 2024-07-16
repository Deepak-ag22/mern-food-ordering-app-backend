import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors= async(req:Request, res:Response, next:NextFunction)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  next();
}
export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("addressLine1 must be a string"),
    body("country").isString().notEmpty().withMessage("country must be a string"),
    body("city").isString().notEmpty().withMessage("city must be a string"),
    handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("city is required"),
  body("country").notEmpty().withMessage("country is required"),
  body("deliveryPrice").isFloat({min:0}).withMessage("delivery Price must be positive number"),
  body("estimatedDeliveryTime").isInt({min:0}).withMessage("Estimated Delivery Time must be postive"),
  body("cuisines").isArray().withMessage("Cuisines must be an array").not().isEmpty().withMessage("Cuisine array cannot be empty"),
  body("menuItems").isArray().withMessage("menu Items must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("menu Items must be an array"),
  body("menuItems.*.price").isFloat({min:0}).withMessage("menu Item price is equired and must be a positive no"),
  handleValidationErrors,
]