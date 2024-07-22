import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Stack,
    Heading,
    Text,
    List,
    ListItem,
    IconButton,
    Flex,
    Spacer,
    useToast,
    Button,
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    SimpleGrid
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const JobsDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/recruiter/getJobs');
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

    const handleDelete = async () => {
        if (selectedJob) {
            try {
                await axios.delete(`http://localhost:8080/api/recruiter/deleteJob/${selectedJob._id}`); 
                fetchJobs();
                toast({
                    title: 'Success',
                    description: 'Job deleted successfully.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                onClose(); // Close the modal after deletion
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

    const handleEdit = () => {
        if (selectedJob) {
            navigate(`/recruiter/update-job/${selectedJob._id}`);
        }
    };

    const handleCreate = () => {
        navigate('/recruiter/create-job');
    };

    // Use Chakra's responsive utility to adjust button positioning
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
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                {jobs.map((job) => (
                    <Box
                        key={job._id}
                        borderWidth="1px"
                        borderRadius="lg"
                        p={4}
                        cursor="pointer"
                        onClick={() => {
                            setSelectedJob(job);
                            onOpen();
                        }}
                        boxShadow="md"
                        bg="white"
                        _hover={{ bg: 'gray.100' }}
                    >
                        <Flex align="center" wrap="wrap">
                            <Stack spacing={2} flex="1">
                                <Heading as="h3" size="md">
                                    {job.positionName}
                                </Heading>
                                <Text>Salary: ${job.salary}</Text>
                                <Text>Positions Available: {job.positionsAvailable}</Text>
                                <Text>{job.jobDescription}</Text>
                                <Text>Resume Required: {job.resumeRequired ? 'Yes' : 'No'}</Text>
                                <Text>Cover Letter Required: {job.coverLetterRequired ? 'Yes' : 'No'}</Text>
                            </Stack>
                            <Spacer />
                            <Stack direction="row" spacing={2}>
                                <IconButton
                                    colorScheme="blue"
                                    aria-label="Edit job"
                                    icon={<EditIcon />}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent modal from opening
                                        handleEdit();
                                    }}
                                />
                                <IconButton
                                    colorScheme="red"
                                    aria-label="Delete job"
                                    icon={<DeleteIcon />}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent modal from opening
                                        handleDelete();
                                    }}
                                />
                            </Stack>
                        </Flex>
                    </Box>
                ))}
            </SimpleGrid>

            {/* Modal for job details */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Job Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedJob && (
                            <Stack spacing={4}>
                                <Heading as="h3" size="md">
                                    {selectedJob.positionName}
                                </Heading>
                                <Text>Salary: ${selectedJob.salary}</Text>
                                <Text>Positions Available: {selectedJob.positionsAvailable}</Text>
                                <Text>{selectedJob.jobDescription}</Text>
                                <Text>Resume Required: {selectedJob.resumeRequired ? 'Yes' : 'No'}</Text>
                                <Text>Cover Letter Required: {selectedJob.coverLetterRequired ? 'Yes' : 'No'}</Text>
                            </Stack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => { handleEdit(); onClose(); }}>
                            Edit
                        </Button>
                        <Button colorScheme="red" mr={3} onClick={() => handleDelete()}>
                            Delete
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default JobsDashboard;
