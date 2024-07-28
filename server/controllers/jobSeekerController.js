/* Jayrajsinh Mahavirsinh Jadeja */

import Job from "../model/Job.js";
import Applicant from "../model/Applicant.js";
import mongoose from "mongoose";

export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function applyForJob(req, res) {
  const { name, email, resume, coverLetter, jobId } = req.body;

  try {
    const newApplicant = new Applicant({
      name,
      email,
      resume,
      coverLetter,
      jobId,
    });

    await newApplicant.save();
    res.status(201).json(newApplicant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

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
