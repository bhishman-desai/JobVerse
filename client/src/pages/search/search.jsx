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
import { useJobSearchStore } from "../../store/store.js";
import useFetch from "../../hooks/fetch.hook";

const JobSearch = () => {
  // State hooks for managing form inputs and job listings
  

  const [location, setLocation] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [payRange, setPayRange] = useState("");
  const [jobs, setJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null); // State to store current user's ID
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  // Accessing jobTitle from the global store and setting it
  const jobTitle = useJobSearchStore((state) => state.jobTitle);
  const setJobTitle = useJobSearchStore((state) => state.setJobTitle);

  // Toggle the visibility of the filter options
  const toggleFilters = () => setShowFilters(!showFilters);

  // Function to handle job search and fetch job listings from API
  const handleSearch = async () => {
    try {

      // Fetch jobs based on the search criteria
      const jobsData = await fetchJobs({ jobTitle, location, datePosted, payRange });
      setJobs(jobsData);
      setCurrentPage(1); // Reset to the first page on a new search

      // Handle cases where no jobs are found
      if (jobsData.length === 0) {
        setErrorMessage('No job postings found for the given criteria.');
      } else {
        setErrorMessage("");
      }
    } catch (error) {
      // Handle errors from the API request
      setErrorMessage(error.message);
    }
  };

  // Perform a search when the component mounts
  useEffect(() => {
    handleSearch();
  }, []);

  // Function to handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const paginatedJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  // Responsive design: adjust stack direction and input width based on screen size
  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const inputWidth = useBreakpointValue({ base: '100%', md: '200px' });
  const [{ apiData, isLoading, serverError }] = useFetch("");
  if (isLoading) return <p>Loading...</p>;
  if (serverError) return <p>Error fetching user data.</p>;

  return (
    <ChakraProvider>
      <Box p={[2, 3, 5]}>
        <Center mb={[3, 4, 5]}>
          <VStack spacing={[3, 4]} align="center" width="100%">
            <Stack direction={stackDirection} spacing={[2, 3, 4]} width="100%" justifyContent="center">
              {/* Input field for job title */}
              <Input
                placeholder="Job Title"
                width={inputWidth}
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              {/* Dropdown for location selection */}
              <Select
                placeholder="Select Location"
                width={inputWidth}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="Ontario">Ontario</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Alberta">Alberta</option>
                <option value="Manitoba">Manitoba</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                <option value="Nova Scotia">Nova Scotia</option>
                <option value="Prince Edward Island">Prince Edward Island</option>
                <option value="Quebec">Quebec</option>
                <option value="Saskatchewan">Saskatchewan</option>
                <option value="Northwest Territories">Northwest Territories</option>
                <option value="Nunavut">Nunavut</option>
                <option value="Yukon">Yukon</option>
              </Select>
              {/* Button to trigger search */}
              <Button colorScheme="teal" height="40px" width={["80px", "100px"]} onClick={handleSearch}>Search</Button>
              {/* Button to toggle filter options visibility */}
              <Button variant="link" onClick={toggleFilters}>
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </Stack>
            <Collapse in={showFilters}>
              <HStack spacing={[2, 3, 4]} mt={[2, 3, 4]} justifyContent="center" direction={stackDirection} width="100%">
                {/* Dropdown for date posted filter */}
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
                {/* Dropdown for pay range filter */}
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
            {/* Display error message if any */}
            {errorMessage ? (
              <Text color="red.500">{errorMessage}</Text>
            ) : (
              // Display paginated job listings
              paginatedJobs.map(job => (
                <JobListing
                  key={job._id}
                  job={job}
                />
              ))
            )}
            {/* Pagination controls */}
            {jobs.length > jobsPerPage && (
              <HStack spacing={2}>
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    colorScheme={index + 1 === currentPage ? 'teal' : 'gray'}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </HStack>
            )}
          </VStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

export default JobSearch;
