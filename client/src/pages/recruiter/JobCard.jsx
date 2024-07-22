// JobCard.jsx
import React from 'react';
import { Box, Stack, Heading, Text, IconButton, Flex, Spacer } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const JobCard = ({ job, onEdit, onDelete, onOpenModal }) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            cursor="pointer"
            onClick={onOpenModal}
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
                            onEdit();
                        }}
                    />
                    <IconButton
                        colorScheme="red"
                        aria-label="Delete job"
                        icon={<DeleteIcon />}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent modal from opening
                            onDelete();
                        }}
                    />
                </Stack>
            </Flex>
        </Box>
    );
};

export default JobCard;
