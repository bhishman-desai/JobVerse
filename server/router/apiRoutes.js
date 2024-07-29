import { Router } from "express";
import authRoute from "./api/authRoute.js";
import testRoute from "./api/testRoute.js";
import RecjobMgmt from "./api/recruiter/jobMgmt.js";
import jobSeekerRoutes from "./api/jobSeeker.js";
import userRoutes from "./api/userRoute.js";

const router = Router();

router.use("/", authRoute);
router.use("/health", testRoute);
router.use("/recruiter", RecjobMgmt);
router.use("/users", userRoutes);
router.use("/jobSeeker", jobSeekerRoutes);
router.use("/search",SearchFunc)
export default router;
