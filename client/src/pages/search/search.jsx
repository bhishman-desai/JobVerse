/* Author: Sivaprakash Chittu Hariharan */
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Input, Select, Button, Stack, HStack, VStack, Center, Text, Collapse } from '@chakra-ui/react';
import JobListing from './helper/jobListings';
import { fetchJobs } from './helper/api'; 

const JobSearch = () => {
  // State hooks for search parameters and results
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [datePosted, setDatePosted] = useState('');
  const [payRange, setPayRange] = useState('');
  const [jobs, setJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Toggles the visibility of the filter options
  const toggleFilters = () => setShowFilters(!showFilters);

  // Fetches job listings based on search parameters
  const handleSearch = async () => {
    try {
      const jobsData = await fetchJobs({ jobTitle, location, datePosted, payRange });
      setJobs(jobsData);
      // Sets an error message if no jobs are found
      if (jobsData.length === 0) {
        setErrorMessage('No job postings found for the given criteria.');
      } else {
        setErrorMessage('');
      }
    } catch (error) {
      // Handles errors and sets the error message
      setErrorMessage(error.message);
    }
  };

  // Fetches all jobs on initial load
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <ChakraProvider>
      <Box p={5}>
        <Center mb={5}>
          <Stack direction="column" spacing={4} align="center">
            <HStack spacing={4}>
              {/* Input fields for job title and location */}
              <Input 
                placeholder="Job Title" 
                width="200px" 
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <Input 
                placeholder="Location" 
                width="200px" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {/* Button to trigger search */}
              <Button colorScheme="teal" height="40px" width="100px" onClick={handleSearch}>Search</Button>
              {/* Button to toggle filter visibility */}
              <Button variant="link" onClick={toggleFilters}>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </HStack>
            <Collapse in={showFilters}>
              <HStack spacing={4} mt={4} justifyContent="center">
                {/* Select dropdown for date posted filter */}
                <Select 
                  placeholder="Date Posted" 
                  width="200px" 
                  height="40px"
                  value={datePosted}
                  onChange={(e) => setDatePosted(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                </Select>
                {/* Select dropdown for pay range filter */}
                <Select 
                  placeholder="Pay Range" 
                  width="200px" 
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
          </Stack>
        </Center>
        <Center>
          <VStack spacing={4} width="80%">
            {/* Display error message if any */}
            {errorMessage ? (
              <Text color="red.500">{errorMessage}</Text>
            ) : (
              // Map over jobs and render JobListing components
              jobs.map(job => (
                <JobListing 
                  key={job._id}
                  job={job}
                />
              ))
            )}
          </VStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

export default JobSearch;
