/* Jayrajsinh Mahavirsinh Jadeja */

import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Center,
  Spinner,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById } from "./helper/jobApis";

const JobDetails = () => {
  // State for storing job details
  const [job, setJob] = useState(null);
  // State for handling loading status
  const [loading, setLoading] = useState(true);
  // Chakra UI Toast hook for displaying messages
  const toast = useToast();
  // Hook for navigation
  const navigate = useNavigate();
  // Extract jobId from route parameters
  const { jobId } = useParams();

  // Responsive sizes for heading, text, and button
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const textSize = useBreakpointValue({ base: "sm", md: "md" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Fetch job details by jobId
        const jobData = await fetchJobById(jobId);
        setJob(jobData);
      } catch (error) {
        // Display error toast and navigate to job list on failure
        toast({
          title: "Error",
          description: "Failed to load job details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/job-seeker/jobs");
      } finally {
        // Set loading to false once data is fetched or an error occurs
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, navigate, toast]);

  // Display spinner while data is loading
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // Display message if job is not found
  if (!job) {
    return (
      <Center h="100vh">
        <Text fontSize={textSize} color="gray.500">
          Job not found
        </Text>
      </Center>
    );
  }

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Heading as="h1" size={headingSize} mb={4}>
        {job.positionName}
      </Heading>
      <Stack spacing={4}>
        <Text fontSize={textSize} fontWeight="bold">
          Salary: ${job.salary}
        </Text>
        <Text fontSize={textSize} fontWeight="bold">
          Available Positions: {job.positionsAvailable}
        </Text>
        <Text fontSize={textSize} fontWeight="bold">
          Location: {job.location}
        </Text>
        <Text fontSize={textSize} fontWeight="bold">
          Company: {job.companyName}
        </Text>
        <Text fontSize={textSize}>Job Description:</Text>
        <Text fontSize={textSize} whiteSpace="pre-line">
          {job.jobDescription}
        </Text>
        <Button
          colorScheme="teal"
          onClick={() => navigate(`/job-seeker/job/${job._id}/apply`)}
          size={buttonSize}
        >
          Apply Now
        </Button>
      </Stack>
    </Box>
  );
};

export default JobDetails;
