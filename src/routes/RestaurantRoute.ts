import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get("/:restaurantId",param("restaurantId").isString().trim().
notEmpty().withMessage("RestaurantId must be valid string"),
RestaurantController.getRestaurant)
router.get("/search/:city",param("city").isString().trim().
notEmpty().withMessage("City must be valid"), 
RestaurantController.searchRestaurant);
 
export default router;