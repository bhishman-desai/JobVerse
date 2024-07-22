import { Router } from "express";
import {createJob, getJobsForRecruiter, getJobById, updateJob, deleteJob} from "../../../controllers/recruiterController.js"

const router = Router()

router.get("/getJobsForRecruiter", getJobsForRecruiter)
router.get("/getJobById/:id", getJobById)
router.post("/createJob", createJob)
router.put("/updateJob/:id",updateJob)
router.delete("/deleteJob/:id",deleteJob)


export default router