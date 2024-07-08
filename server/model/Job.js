import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const jobSchema = new mongoose.Schema({
    positionName: { type: String, required: true },
    salary: { type: Number, required: true },
    positionsAvailable: { type: Number, required: true },
    jobDescription: { type: String, required: true },
    resumeRequired: { type: Boolean, required: true },
    coverLetterRequired: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
