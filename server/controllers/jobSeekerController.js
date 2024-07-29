import Job from "../model/Job.js";
import Applicant from "../model/Applicants.js";
import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

const upload = multer({ storage: multer.memoryStorage() });

const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(file.buffer);
  });
};

export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const applyForJob = async (req, res) => {
  const { name, email, jobId } = req.body;
  const resumeFile = req.file?.resume; // `req.file` for single file, `req.files` for multiple files
  const coverLetterFile = req.file?.coverLetter;

  if (!name || !email || !jobId) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Handle file uploads
    const resumeUpload = resumeFile
      ? await uploadToCloudinary(resumeFile)
      : null;
    const coverLetterUpload = coverLetterFile
      ? await uploadToCloudinary(coverLetterFile)
      : null;

    const newApplicant = new Applicant({
      name,
      email,
      resume: resumeUpload?.secure_url,
      coverLetter: coverLetterUpload?.secure_url,
      jobId,
    });

    await newApplicant.save();
    res.status(201).json(newApplicant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export async function getApplicantsByJobId(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Job ID is required" });
  }

  try {
    const applicants = await Applicant.find({ jobId: id });

    if (applicants.length === 0) {
      return res
        .status(404)
        .json({ message: "No applicants found for this job" });
    }

    return res.status(200).json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching applicants" });
  }
}

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
