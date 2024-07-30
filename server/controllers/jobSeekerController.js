/* Jayrajsinh Mahavirsinh Jadeja */

import Job from "../model/Job.js";
import Applicant from "../model/Applicants.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

const uploadToCloudinary = async (file) => {
  if (!file || !file.buffer) {
    throw new Error("Invalid file object");
  }

  const fileBuffer =
    file.buffer instanceof ArrayBuffer ? Buffer.from(file.buffer) : file.buffer;

  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), 30000)
  );

  const uploadPromise = new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(fileBuffer);
  });

  return Promise.race([uploadPromise, timeout]);
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
  const resumeFile = req.files?.resume;
  const coverLetterFile = req.files?.coverLetter;

  if (!name || !email || !jobId) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const resumeUpload = resumeFile
      ? await uploadToCloudinary(resumeFile[0].buffer)
      : null;
    const coverLetterUpload = coverLetterFile
      ? await uploadToCloudinary(coverLetterFile[0].buffer)
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
