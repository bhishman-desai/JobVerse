/* Author: Ashish Kumar Guntipalli */

import { Router } from "express";
import {createJob, getJobsForRecruiter, getJobById, updateJob, deleteJob, addApplicant, getApplicantsByJobId, updateApplicantStatus} from "../../../controllers/recruiterController.js"

const router = Router()

router.get("/getJobsForRecruiter", getJobsForRecruiter)
router.get("/getJobById/:id", getJobById)
router.post("/createJob", createJob)
router.put("/updateJob/:id",updateJob)
router.delete("/deleteJob/:id",deleteJob)

router.post("/addApplicant", addApplicant)
router.get("/getApplicantsByJobId/:id", getApplicantsByJobId)
router.put("/updateApplicantStatus/:applicantId", updateApplicantStatus)

export default router