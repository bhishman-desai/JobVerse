import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    resume: { type: String, required: true },
    coverLetter: { type: String, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }
})

const Applicants = mongoose.model('Applicants', applicantSchema);

export default Applicants;