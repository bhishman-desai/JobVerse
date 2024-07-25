/* Author: Ashish Kumar Guntipalli */

import { Box, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const JobDetailsTab = ({ job, onDelete }) => {
    const navigate = useNavigate();

    return (
        <Stack spacing={6}>
            <Heading as="h1" size="2xl">
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
                <Button colorScheme="teal" onClick={() => navigate(`/recruiter/update-job/${job._id}`)}>
                    <EditIcon mr={2} />
                    Edit Job
                </Button>
                <Button colorScheme="red" onClick={onDelete}>
                    <DeleteIcon mr={2} />
                    Delete Job
                </Button>
                <Button colorScheme="gray" onClick={() => navigate('/recruiter/dashboard')}>
                    <ArrowBackIcon mr={2} />
                    Back to Dashboard
                </Button>
            </Stack>
        </Stack>
    );
};

export default JobDetailsTab;
