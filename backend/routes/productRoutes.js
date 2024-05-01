import express from "express";
import { addProduct, deleteProductController,brainTreePaymentController,realtedProductController,searchProductController, getProductController, getSingleProductController,braintreeTokenController, updateProductController, productCategoryController } from "../controller/productController.js";
const productRouter = express.Router();
productRouter.post("/create",addProduct)
productRouter.put("/:id",updateProductController)
productRouter.get("/get-products",getProductController)
productRouter.get("/:slug",getSingleProductController)
productRouter.delete("/:id",deleteProductController)
productRouter.get("/search/:keyword", searchProductController);
//payments routes
//token
productRouter.get("/braintree/token", braintreeTokenController);

//payments
productRouter.post("/braintree/payment",  brainTreePaymentController);
//similar product
productRouter.get("/related-product/:pid/:cid", realtedProductController);
productRouter.get("/product-category/:slug", productCategoryController);

export default productRouter;