import express from "express";
import { allOrderController, createOrderController, updateOrderController, userOrderController } from "../controller/orderController.js";
const orderRoutes = express.Router();
orderRoutes.get('/get-all-orders',allOrderController)
orderRoutes.get('/get-all-user-orders/:id',userOrderController)
orderRoutes.put('/update-order/:id',updateOrderController)
orderRoutes.post('/create-order',createOrderController)
export default orderRoutes;