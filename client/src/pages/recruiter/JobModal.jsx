import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Box,
    Text,
    Button,
    HStack,
    Select
} from '@chakra-ui/react';

const JobModal = ({ isOpen, onClose, job, onEdit, onDelete }) => {
    // Temporary applicants data
    const [applicants, setApplicants] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Applied' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Interviewed' },
    ]);

    const handleStatusChange = (applicantId, newStatus) => {
        // Update applicant status in the local state
        setApplicants(prevApplicants => 
            prevApplicants.map(applicant => 
                applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
            )
        );

        // Optionally, send an API request to update the status in the backend
        // axios.put(`/api/applicants/${applicantId}`, { status: newStatus })
        //     .then(response => console.log('Status updated', response))
        //     .catch(error => console.error('Error updating status', error));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{job?.positionName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs variant='enclosed'>
                        <TabList>
                            <Tab>Job Details</Tab>
                            <Tab>Applicants</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Box mb={4}>
                                    <Text><strong>Salary:</strong> ${job?.salary}</Text>
                                    <Text><strong>Positions Available:</strong> {job?.positionsAvailable}</Text>
                                    <Text><strong>Description:</strong> {job?.jobDescription}</Text>
                                    <Text><strong>Resume Required:</strong> {job?.resumeRequired ? 'Yes' : 'No'}</Text>
                                    <Text><strong>Cover Letter Required:</strong> {job?.coverLetterRequired ? 'Yes' : 'No'}</Text>
                                </Box>
                                <HStack spacing={4} mt={4}>
                                    <Button colorScheme="blue" onClick={onEdit}>Edit Job</Button>
                                    <Button colorScheme="red" onClick={onDelete}>Delete Job</Button>
                                </HStack>
                            </TabPanel>
                            <TabPanel>
                                <Box>
                                    {applicants.length === 0 ? (
                                        <Text>No applicants for this job</Text>
                                    ) : (
                                        <Box>
                                            {applicants.map((applicant) => (
                                                <Box key={applicant.id} mb={2} p={2} borderWidth="1px" borderRadius="md">
                                                    <Text><strong>Name:</strong> {applicant.name}</Text>
                                                    <Text><strong>Email:</strong> {applicant.email}</Text>
                                                    <Text><strong>Status:</strong> {applicant.status}</Text>
                                                    <Select
                                                        mt={2}
                                                        placeholder="Change Status"
                                                        value={applicant.status}
                                                        onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                                                    >
                                                        <option value="Applied">Applied</option>
                                                        <option value="Interviewed">Interviewed</option>
                                                        <option value="Offered">Offered</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </Select>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default JobModal;
