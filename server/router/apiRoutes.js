/* Author: Bhishman Desai */
import { Router } from "express";
import authRoute from "./api/authRoute.js";
import testRoute from "./api/testRoute.js";
import RecjobMgmt from "./api/recruiter/jobMgmt.js"
import userRoutes from './api/userRoute.js';
import notificationRoute from "./api/notificationRoute.js"


const router = Router();

router.use("/", authRoute);
router.use("/health", testRoute);
router.use("/recruiter", RecjobMgmt);
router.use('/users', userRoutes);

/* Author: Sivasubramanian Venkatasubramanian */
router.use("/notifications", notificationRoute);

export default router;