/* Jayrajsinh Mahavirsinh Jadeja */

import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { fetchJobs } from "./helper/jobApis"; // Adjust the import path as needed

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobData = await fetchJobs(); // Adjust API call if needed
        setJobs(jobData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load jobs.",
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

  const filteredJobs = jobs.filter(
    (job) =>
      job.positionName.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || job.location === filter)
  );

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={6} maxW="container.xl" mx="auto">
      <Heading as="h2" mb={5} size="xl" textAlign="center">
        Job Listings
      </Heading>
      <Stack spacing={4} mb={5}>
        <Input
          placeholder="Search by position"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          placeholder="Filter by location"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {/* You might want to map through unique locations from jobs data */}
        </Select>
      </Stack>
      {filteredJobs.length === 0 ? (
        <Center>
          <Text fontSize="lg" color="gray.500">
            No jobs available
          </Text>
        </Center>
      ) : (
        <Table variant="simple" size="md" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Position</Th>
              <Th>Salary</Th>
              <Th>Available Positions</Th>
              <Th>Location</Th>
              <Th>Company</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredJobs.map((job) => (
              <Tr key={job._id}>
                <Td>{job.positionName}</Td>
                <Td>{job.salary}</Td>
                <Td>{job.positionsAvailable}</Td>
                <Td>{job.location}</Td>
                <Td>{job.companyName}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    onClick={() => navigate(`/job/${job._id}`)}
                  >
                    View Details
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default JobSeekerDashboard;
