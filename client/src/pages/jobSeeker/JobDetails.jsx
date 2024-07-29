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
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById } from "./helper/jobApis";

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { jobId } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await fetchJobById(jobId);
        setJob(jobData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load job details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/job-seeker/jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, navigate, toast]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!job) {
    return (
      <Center h="100vh">
        <Text fontSize="lg" color="gray.500">
          Job not found
        </Text>
      </Center>
    );
  }

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Heading as="h1" size="2xl" mb={4}>
        {job.positionName}
      </Heading>
      <Stack spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          Salary: ${job.salary}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          Available Positions: {job.positionsAvailable}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          Location: {job.location}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          Company: {job.companyName}
        </Text>
        <Text fontSize="md">Job Description:</Text>
        <Text fontSize="md" whiteSpace="pre-line">
          {job.jobDescription}
        </Text>
        <Button
          colorScheme="teal"
          onClick={() => navigate(`/job-seeker/job/${job._id}/apply`)}
        >
          Apply Now
        </Button>
      </Stack>
    </Box>
  );
};

export default JobDetails;
