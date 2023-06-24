import { Router } from "express";
import { authRouter, userRouter } from "../Domains/routers.exports";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
