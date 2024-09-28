import { appconfig } from "../config/appconfig.js";
import { CreateRazorPayInstance } from "../config/razorpayconfig.js";
import crypto from "crypto";

// ORDER PRODUCT

export const OrderController = async (req, res) => {
  const { productId, amount } = req.body; // Take Amount from Backend Only

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "reciept_order_1",
  };

  const RozarPay = CreateRazorPayInstance();
  try {
    RozarPay.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: `Something went wrong`,
        });
      }
      res.status(200).json({
        status: "Sucess",
        message: order,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Something went wrong`,
    });
  }
};

// VERIFY PAYMENT

export const verifyPaymentController = async (req, res) => {
  const { order_id, paymnet_id, signature } = req.body;

  const SecretKey = appconfig.RAZORPAY_API_SECRET;

  const hmac = crypto.createHmac("sha256", SecretKey);

  hmac.update(order_id + " " + paymnet_id);

  const generateSignature = hmac.digest("hex");

  if (generateSignature === signature) {
    return res.status(200).json({
      status: "Sucess",
      message: "Payment Verified",
    });
  } else {
    return res.status(400).json({
      status: "Failed",
      message: "Payment verification failed",
    });
  }
};
