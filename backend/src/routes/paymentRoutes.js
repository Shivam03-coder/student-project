import { Router } from "express";
import {
  OrderController,
  verifyPaymentController,
} from "../controllers/payentController.js";

export const paymnetRoutes = Router();

paymnetRoutes.route("/order-product", OrderController);
paymnetRoutes.route("/order-product/verifypaymnet", verifyPaymentController);
