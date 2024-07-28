/* Jayrajsinh Mahavirsinh Jadeja */

import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { applyForJob } from "./helper/jobApis";

const JobApplication = () => {
  const { jobId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleResumeChange = (e) => setResume(e.target.files[0]);
  const handleCoverLetterChange = (e) => setCoverLetter(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);
      formData.append("jobId", jobId);

      await applyForJob(formData);

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/job-seeker/jobs");
    } catch (error) {
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

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Heading as="h1" size="lg" mb={4}>
        Apply for Job
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Resume (PDF)</FormLabel>
          <Input type="file" accept=".pdf" onChange={handleResumeChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Cover Letter</FormLabel>
          <Textarea
            value={coverLetter}
            onChange={handleCoverLetterChange}
            placeholder="Write your cover letter here..."
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" isLoading={loading}>
          Apply Now
        </Button>
      </form>
    </Box>
  );
};

export default JobApplication;
