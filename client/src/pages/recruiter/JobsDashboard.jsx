import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Button,
    useToast,
    useBreakpointValue,
    SimpleGrid,
    Text,
    Center
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import JobModal from './JobModal';
import { useDisclosure } from '@chakra-ui/react';

import { getUsername } from '../auth/helper/api';

const JobsDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const loadData = async () => {
            try {
                const username = await getUsername();
                fetchJobs(username.userId); // Pass recruiterId to fetchJobs
            } catch (error) {
                navigate('/login');
            }
        };

        loadData();
    }, [navigate]);

    const fetchJobs = async (recruiterId) => {
        try {
            const response = await axios.get(`/api/recruiter/getJobsForRecruiter`, {
                params: { recruiterId } 
            });
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch jobs.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (job) => {
        if (job) {
            try {
                await axios.delete(`http://localhost:8080/api/recruiter/deleteJob/${job._id}`);
                fetchJobs(); // Refresh jobs list after deletion
                toast({
                    title: 'Success',
                    description: 'Job deleted successfully.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                onClose(); // Close the modal after deletion if open
            } catch (error) {
                console.error('Error deleting job:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to delete job.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const handleCreate = () => {
        navigate('/recruiter/create-job');
    };

    const buttonPosition = useBreakpointValue({
        base: { top: '4', right: '4' },
        md: { top: '6', right: '6' }
    });

    return (
        <Box p={4}>
            <Button
                colorScheme="teal"
                aria-label="Create job"
                mb={5}
                position="fixed"
                top={buttonPosition.top}
                right={buttonPosition.right}
                borderRadius="full"
                size={{ base: "md", md: "lg" }}
                boxShadow="md"
                onClick={handleCreate}
                zIndex="tooltip"
            >
                Create Job
            </Button>
            <Heading as="h2" mb={5} size="xl" textAlign="center">
                Jobs Dashboard
            </Heading>
            {jobs.length === 0 ? (
                <Center>
                    <Text fontSize="lg" color="gray.500">
                        No jobs available
                    </Text>
                </Center>
            ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                    {jobs.map((job) => (
                        <JobCard
                            key={job._id}
                            job={job}
                            onEdit={() => navigate(`/recruiter/update-job/${job._id}`)}
                            onDelete={() => handleDelete(job)}
                            onOpenModal={() => {
                                setSelectedJob(job);
                                onOpen();
                            }}
                        />
                    ))}
                </SimpleGrid>
            )}

            <JobModal
                isOpen={isOpen}
                onClose={onClose}
                job={selectedJob}
                onEdit={() => {
                    navigate(`/recruiter/update-job/${selectedJob?._id}`);
                    onClose();
                }}
                onDelete={() => {
                    handleDelete(selectedJob);
                    onClose();
                }}
            />
        </Box>
    );
};

export default JobsDashboard;
