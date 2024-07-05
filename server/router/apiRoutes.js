import {Router} from "express";
import authRoute from "./api/authRoute.js";
import testRoute from "./api/testRoute.js";

const router = Router();

/* List of all routes / endpoint / apis */

/* Auth Module Route */
router.use("/", authRoute);
router.use("/health", testRoute);

export default router;