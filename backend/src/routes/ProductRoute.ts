import express from "express";
import { getProduct, getProducts } from "../controllers/ProductController";

const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProduct);

export { router as productRoute };
