/* Author: Sivaprakash Chittu Hariharan */

import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Select,
  Button,
  Stack,
  HStack,
  VStack,
  Center,
  Text,
  Collapse,
  useBreakpointValue,
} from "@chakra-ui/react";
import JobListing from "./helper/jobListings";
import { fetchJobs } from "./helper/api";
import { fetchApplicationsByEmail } from "../jobSeeker/helper/jobApis.js";
import { useJobSearchStore } from "../../store/store.js";
import useFetch from "../../hooks/fetch.hook";

const JobSearch = () => {
  const [location, setLocation] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [payRange, setPayRange] = useState("");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [email, setEmail] = useState("");

  const jobTitle = useJobSearchStore((state) => state.jobTitle);
  const setJobTitle = useJobSearchStore((state) => state.setJobTitle);

  const toggleFilters = () => setShowFilters(!showFilters);

  const [{ apiData, isLoading, serverError }] = useFetch("");

  useEffect(() => {
    if (apiData) {
      setCurrentUserId(apiData._id);
      setEmail(apiData.email);
    }
  }, [apiData]);

  const handleSearch = async () => {
    try {
      const jobsData = await fetchJobs({
        jobTitle,
        location,
        datePosted,
        payRange,
      });
      const filteredJobs = jobsData.filter(
        (job) => job.recruiterId !== currentUserId
      );
      setJobs(filteredJobs);
      if (filteredJobs.length === 0) {
        setErrorMessage("No job postings found for the given criteria.");
      } else {
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (email) {
      fetchApplicationsByEmail(email)
        .then((applicationsData) => {
          setApplications(applicationsData);
        })
        .catch((error) => {
          console.error("Error fetching applications:", error);
        });
    }
  }, [email]);

  useEffect(() => {
    handleSearch();
  }, [email]);

  const stackDirection = useBreakpointValue({ base: "column", md: "row" });
  const inputWidth = useBreakpointValue({ base: "100%", md: "200px" });

  if (isLoading) return <p>Loading...</p>;
  if (serverError) return <p>Error fetching user data.</p>;

  return (
    <ChakraProvider>
      <Box p={[2, 3, 5]}>
        <Center mb={[3, 4, 5]}>
          <VStack spacing={[3, 4]} align="center" width="100%">
            <Stack
              direction={stackDirection}
              spacing={[2, 3, 4]}
              width="100%"
              justifyContent="center"
            >
              <Input
                placeholder="Job Title"
                width={inputWidth}
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <Input
                placeholder="Location"
                width={inputWidth}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button
                colorScheme="teal"
                height="40px"
                width={["80px", "100px"]}
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button variant="link" onClick={toggleFilters}>
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </Stack>
            <Collapse in={showFilters}>
              <HStack
                spacing={[2, 3, 4]}
                mt={[2, 3, 4]}
                justifyContent="center"
                direction={stackDirection}
                width="100%"
              >
                <Select
                  placeholder="Date Posted"
                  width={inputWidth}
                  height="40px"
                  value={datePosted}
                  onChange={(e) => setDatePosted(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                </Select>
                <Select
                  placeholder="Pay Range"
                  width={inputWidth}
                  height="40px"
                  value={payRange}
                  onChange={(e) => setPayRange(e.target.value)}
                >
                  <option value="0-50000">$0 - $50,000</option>
                  <option value="50000-100000">$50,000 - $100,000</option>
                  <option value="100000">$100,000+</option>
                </Select>
              </HStack>
            </Collapse>
          </VStack>
        </Center>
        <Center>
          <VStack spacing={[3, 4]} width="100%">
            {errorMessage ? (
              <Text color="red.500">{errorMessage}</Text>
            ) : (
              jobs.map((job) => {
                const alreadyApplied = applications.some(
                  (application) => application.jobId._id === job._id
                );
                return (
                  <JobListing
                    key={job._id}
                    job={job}
                    alreadyApplied={alreadyApplied}
                  />
                );
              })
            )}
          </VStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

export default JobSearch;
