import Job from "../model/Job.js";
import User from "../model/User.model.js";
import mongoose from 'mongoose';

export async function createJob(req, res) {
    const { positionName, salary, positionsAvailable, jobDescription, resumeRequired, coverLetterRequired, recruiterId } = req.body;

    try {
        // Convert recruiterId to ObjectId
        const convertedRecruiterId = mongoose.Types.ObjectId(recruiterId);

        // Fetch user by recruiterId
        const user = await User.findById(convertedRecruiterId);
        if (!user) {
            return res.status(400).json({ message: "Invalid recruiter ID" });
        }

        // Check if user has the Recruiter role
        if (!user.roles.Recruiter) {
            return res.status(403).json({ message: "Unauthorized. Only recruiters can create jobs." });
        }

        // Create and save the new job
        const newJob = new Job({
            positionName,
            salary,
            positionsAvailable,
            jobDescription,
            resumeRequired,
            coverLetterRequired,
            recruiterId: convertedRecruiterId
        });

        await newJob.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


// export async function getAllJobs(req, res) {
//     try {
//         const jobs = await Job.find();
//         res.status(200).json(jobs);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

export async function getJobsForRecruiter(req, res) {
    const { recruiterId } = req.query; // Get recruiterId from query parameters

    try {
        if (!recruiterId) {
            return res.status(400).json({ message: 'Recruiter ID is required.' });
        }

        // Find jobs that match the recruiterId
        const jobs = await Job.find({ recruiterId: recruiterId });

        // Send the jobs as a response
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

