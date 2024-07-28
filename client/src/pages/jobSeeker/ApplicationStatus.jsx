/* Jayrajsinh Mahavirsinh Jadeja */

import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { fetchApplications } from "./helper/jobApis"; // Adjust the import path as needed

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const applicationData = await fetchApplications();
        setApplications(applicationData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load applications.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [toast]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (applications.length === 0) {
    return (
      <Center h="100vh">
        <Text fontSize="lg" color="gray.500">
          No applications found
        </Text>
      </Center>
    );
  }

  return (
    <Box p={6} maxW="container.xl" mx="auto">
      <Heading as="h2" mb={5} size="xl" textAlign="center">
        Application Status
      </Heading>
      <Table variant="simple" size="md" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Job Position</Th>
            <Th>Application Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {applications.map((app) => (
            <Tr key={app._id}>
              <Td>{app.positionName}</Td>
              <Td>{app.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ApplicationStatus;
