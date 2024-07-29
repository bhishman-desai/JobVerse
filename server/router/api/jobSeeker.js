import multer from "multer";
import { Router } from "express";
import {
  getAllJobs,
  getJobById,
  applyForJob,
  getApplicantsByJobId,
} from "../../controllers/jobSeekerController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/jobs", getAllJobs);
router.post(
  "/apply",
  upload.fields([{ name: "resume" }, { name: "coverLetter" }]),
  applyForJob
); // Handle file upload
router.get("/jobs/:id", getJobById);
router.get("/applicants/:id", getApplicantsByJobId);

export default router;
