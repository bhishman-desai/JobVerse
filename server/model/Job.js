import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    positionName: { type: String, required: true },
    salary: { type: Number, required: true },
    positionsAvailable: { type: Number, required: true },
    jobDescription: { type: String, required: true },
    resumeRequired: { type: Boolean, required: true },
    coverLetterRequired: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User schema
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
