/* Jayrajsinh Mahavirsinh Jadeja */

import { Router } from "express";
import { getAllJobs, applyForJob, getApplicantsByJobId } from "../../controllers/jobSeekerController.js";

const router = Router();

router.get("/jobs", getAllJobs);
router.post("/apply", applyForJob);
router.get("/applicants/:id", getApplicantsByJobId);

export default router;
