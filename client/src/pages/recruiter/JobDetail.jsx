import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Text,
    Stack,
    Button,
    useToast,
    Spinner,
    Center,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetail = () => {
    const [job, setJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingApplicants, setLoadingApplicants] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { jobId } = useParams();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                if (!jobId) {
                    throw new Error('Job ID is missing');
                }

                const response = await axios.get(`http://localhost:8080/api/recruiter/getJobById/${jobId}`);
                if (response.status === 200 && response.data) {
                    setJob(response.data);
                } else {
                    throw new Error('Job not found');
                }
            } catch (error) {
                console.error('Error fetching job:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to load job details. Redirecting to dashboard.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/recruiter/dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobId, toast, navigate]);

    const fetchApplicants = async () => {
        setLoadingApplicants(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/recruiter/getApplicantsByJobId/${jobId}`);
            if (response.status === 200 && response.data) {
                setApplicants(response.data);
            } else {
                throw new Error('No applicants found');
            }
        } catch (error) {
            console.error('Error fetching applicants:', error);
            toast({
                title: 'Error',
                description: 'Failed to load applicants. Please try again later.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoadingApplicants(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/recruiter/deleteJob/${jobId}`);
            if (response.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Job deleted successfully. Redirecting to dashboard.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/recruiter/dashboard');
            } else {
                throw new Error('Failed to delete job');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete job. Please try again later.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

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
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Job Details</Tab>
                    <Tab onClick={fetchApplicants}>Applicants</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Stack spacing={4}>
                            <Heading as="h1" size="xl">
                                {job.positionName}
                            </Heading>
                            <Text fontSize="lg" fontWeight="bold">
                                Salary: ${job.salary}
                            </Text>
                            <Text fontSize="lg" fontWeight="bold">
                                Available Positions: {job.positionsAvailable}
                            </Text>
                            <Text fontSize="lg" fontWeight="bold">
                                Job Description:
                            </Text>
                            <Text fontSize="md" whiteSpace="pre-line">
                                {job.jobDescription}
                            </Text>
                            <Stack direction="row" spacing={4} mt={4}>
                                <Button colorScheme="teal" onClick={() => navigate(`/recruiter/update-job/${jobId}`)}>
                                    Edit Job
                                </Button>
                                <Button colorScheme="red" onClick={handleDelete}>
                                    Delete Job
                                </Button>
                                <Button colorScheme="gray" onClick={() => navigate('/recruiter/dashboard')}>
                                    Back to Dashboard
                                </Button>
                            </Stack>
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        {loadingApplicants ? (
                            <Center h="100vh">
                                <Spinner size="xl" />
                            </Center>
                        ) : (
                            <Box>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>Email</Th>
                                            <Th>Actions</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {applicants.map((applicant) => (
                                            <Tr key={applicant.id}>
                                                <Td>{applicant.name}</Td>
                                                <Td>{applicant.email}</Td>
                                                <Td>
                                                    <Button colorScheme="blue" mr={2}>
                                                        View Resume
                                                    </Button>
                                                    <Button colorScheme="blue">
                                                        View Cover Letter
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default JobDetail;
