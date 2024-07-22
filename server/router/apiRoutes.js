/* Author: Bhishman Desai */
import {Router} from "express";
import authRoute from "./api/authRoute.js";
import testRoute from "./api/testRoute.js";
import jobMgmt from "./api/recruiter/jobMgmt.js"

const router = Router();

/* List of all routes / endpoint / apis */

/* Auth Module Route */
router.use("/", authRoute);
router.use("/health", testRoute);
router.use("/recruiter", jobMgmt);

export default router;