import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/* Fetch all jobs */
export const fetchJobs = async () => {
  try {
    const response = await axios.get(`/api/jobSeeker/jobs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs.");
  }
};

/* Fetch a specific job by ID */
export const fetchJobById = async (id) => {
  try {
    const response = await axios.get(`/api/jobSeeker/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw new Error("Failed to fetch job details.");
  }
};

/* Apply for a job */
export const applyForJob = async (formData) => {
  try {
    const response = await axios.post(`/api/jobSeeker/apply`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error);
    throw new Error("Failed to apply for job.");
  }
};

/* Fetch job applications */
export const fetchApplications = async () => {
  try {
    const response = await axios.get(`/api/jobSeeker/applications`);
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw new Error("Failed to fetch applications.");
  }
};

/* Fetch user profile */
export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`/api/profile`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile.");
  }
};

/* Update user profile */
export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put(`/api/profile`, profileData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile.");
  }
};
