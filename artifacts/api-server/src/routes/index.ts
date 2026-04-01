import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import contentRouter from "./content";
import inquiriesRouter from "./inquiries";
import productsRouter from "./products";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/content", contentRouter);
router.use("/inquiries", inquiriesRouter);
router.use("/products", productsRouter);

export default router;
