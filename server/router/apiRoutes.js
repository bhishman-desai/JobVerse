/* Author: Bhishman Desai */
import { Router } from "express";
import authRoute from "./api/authRoute.js";
import testRoute from "./api/testRoute.js";
import RecjobMgmt from "./api/recruiter/jobMgmt.js";
import jobSeekerRoutes from "./api/jobSeeker.js";

const router = Router();

/* List of all routes / endpoint / apis */

/* Auth Module Route */
router.use("/", authRoute);
router.use("/health", testRoute);

/* Author: Ashish Kumar Guntipalli */
router.use("/recruiter", RecjobMgmt);

/* Jayrajsinh Mahavirsinh Jadeja */
router.use("/jobSeeker", jobSeekerRoutes);

export default router;
