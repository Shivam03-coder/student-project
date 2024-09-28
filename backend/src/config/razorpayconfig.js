import RazorPay from "razorpay";
import { appconfig } from "./appconfig.js";

export const CreateRazorPayInstance = () =>
  new RazorPay({
    key_id: appconfig.RAZORPAY_API,
    key_secret: appconfig.RAZORPAY_API_SECRET,
  });
