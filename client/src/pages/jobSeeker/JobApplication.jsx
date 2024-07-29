/* Jayrajsinh Mahavirsinh Jadeja */

import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { applyForJob } from "./helper/jobApis";
import useFetch from "../../hooks/fetch.hook";

const JobApplication = () => {
  const { jobId } = useParams();
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const [{ isLoading, apiData, serverError }] = useFetch("");

  const handleResumeChange = (e) => setResume(e.target.files[0]);
  const handleCoverLetterChange = (e) => setCoverLetter(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", apiData?.username || "");
      formData.append("email", apiData?.email || "");
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);
      formData.append("jobId", jobId);

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await applyForJob(formData);
      console.log(response);

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/job-seeker/jobs");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (serverError) return <p>Error fetching user data.</p>;

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Heading as="h1" size="lg" mb={4}>
        Apply for Job
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" value={apiData?.username || ""} isReadOnly />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={apiData?.email || ""} isReadOnly />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Resume (PDF)</FormLabel>
          <Input type="file" accept=".pdf" onChange={handleResumeChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Cover Letter (PDF)</FormLabel>
          <Input type="file" accept=".pdf" onChange={handleCoverLetterChange} />
        </FormControl>
        <Button type="submit" colorScheme="teal" isLoading={loading}>
          Apply Now
        </Button>
      </form>
    </Box>
  );
};

export default JobApplication;
