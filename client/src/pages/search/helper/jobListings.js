/* Author: Sivaprakash Chittu Hariharan */
import React from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';

// JobListing Component
const JobListing = ({ job }) => (
  <Box p={3} shadow="md" borderWidth="1px" mb={2} maxW="md" width="100%">
    <VStack align="flex-start" spacing={2}>
      <Text fontSize="lg" fontWeight="bold">{job.positionName}</Text>
      <Text>{job.companyName}</Text>
      <Text><strong>Location:</strong> {job.location}</Text>
      <Text><strong>Responsibilities:</strong> {job.jobDescription}</Text>
      <Text><strong>Salary:</strong> ${job.salary}</Text>
      <Button colorScheme="teal" size="sm" alignSelf="flex-end">Apply Now</Button>
    </VStack>
  </Box>
);

export default JobListing;
