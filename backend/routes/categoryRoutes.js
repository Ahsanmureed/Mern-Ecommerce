import express from "express";
import {categoryControlller,createCategoryController,updateCategoryController,singleCategoryController,deleteCategoryCOntroller} from "../controller/categoryController.js";

const categoryRouter = express.Router();
categoryRouter.post("/create",createCategoryController)
categoryRouter.delete("/:id",deleteCategoryCOntroller)
categoryRouter.put("/:id",updateCategoryController)
categoryRouter.get("/get-all-category",categoryControlller)
categoryRouter.get("/:slug",singleCategoryController)
export default categoryRouter