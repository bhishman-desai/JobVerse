import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Stack, Button, useToast } from "@chakra-ui/react";
import { fetchJobs } from "./helper/jobApis"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobData = await fetchJobs(); // Fetch jobs from the API
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast({
          title: "Error",
          description: "Failed to load job listings.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [toast]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={6} maxW="container.lg" mx="auto">
      <Heading as="h1" size="xl" mb={4}>
        Job Listings
      </Heading>
      {jobs.length === 0 ? (
        <Text>No jobs available.</Text>
      ) : (
        <Stack spacing={4}>
          {jobs.map((job) => (
            <Box key={job._id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{job.positionName}</Heading>
              <Text mt={4}>Company: {job.companyName}</Text>
              <Text mt={2}>Location: {job.location}</Text>
              <Text mt={2}>Salary: ${job.salary}</Text>
              <Button
                mt={4}
                colorScheme="teal"
                onClick={() => navigate(`/job-seeker/jobs/${job._id}`)}
              >
                View Details
              </Button>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default JobListings;
