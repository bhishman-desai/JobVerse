import { Router } from "express";
import {createJob, getAllJobs, getJobById, updateJob, deleteJob} from "../../../controllers/recruiterController.js"

const router = Router()

router.get("/getJobs", getAllJobs)
router.get("/getJobById/:id", getJobById)
router.post("/createJob", createJob)
router.put("/updateJob/:id",updateJob)
router.delete("/deleteJob/:id",deleteJob)


export default router