/* Jayrajsinh Mahavirsinh Jadeja */

export const fetchJobs = async () => {
  const response = await fetch("/api/jobs");
  if (!response.ok) throw new Error("Failed to fetch jobs");
  return response.json();
};

export const fetchJobById = async (id) => {
  const response = await fetch(`/api/jobs/${id}`);
  if (!response.ok) throw new Error("Failed to fetch job");
  return response.json();
};

export const applyForJob = async (id) => {
  const response = await fetch(`/api/jobs/${id}/apply`, { method: "POST" });
  if (!response.ok) throw new Error("Failed to apply for job");
  return response.json();
};

export const fetchApplications = async () => {
  const response = await fetch("/api/applications");
  if (!response.ok) throw new Error("Failed to fetch applications");
  return response.json();
};

// userApis.js
export const fetchUserProfile = async () => {
  const response = await fetch("/api/profile");
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
};

export const updateUserProfile = async (profileData) => {
  const response = await fetch("/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
};
