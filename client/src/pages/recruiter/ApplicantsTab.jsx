import React from 'react';
import {
    Box,
    Spinner,
    Center,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    Button,
    Text,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
} from '@chakra-ui/react';

const ApplicantsTab = ({ applicants, loading, onStatusChange }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [pdfUrl, setPdfUrl] = React.useState('');
    const [pdfType, setPdfType] = React.useState('');

    const handleViewPdf = (url, type) => {
        setPdfUrl(url);
        setPdfType(type);
        onOpen();
    };

    return loading ? (
        <Center h="100vh">
            <Spinner size="xl" />
        </Center>
    ) : (
        <Box p={4}>
            <Table variant="simple" width="full">
                <Thead>
                    <Tr>
                        <Th minWidth="150px">Name</Th>
                        <Th minWidth="200px">Email</Th>
                        <Th minWidth="150px">Status</Th>
                        <Th minWidth="200px">Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {applicants.length > 0 ? (
                        applicants.map((applicant) => (
                            <Tr key={applicant._id}>
                                <Td>{applicant.name}</Td>
                                <Td>{applicant.email}</Td>
                                <Td>
                                    <Select
                                        value={applicant.status}
                                        onChange={(e) => onStatusChange(applicant._id, e.target.value)}
                                        size="sm"
                                    >
                                        <option value="Applied">Applied</option>
                                        <option value="Interview">Interview</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Rejected">Rejected</option>
                                    </Select>
                                </Td>
                                <Td>
                                    <Stack direction="row" spacing={3} align="center">
                                        <Button
                                            colorScheme="blue"
                                            size="sm"
                                            onClick={() => handleViewPdf(applicant.resume, 'Resume')}
                                        >
                                            View Resume
                                        </Button>
                                        <Button
                                            colorScheme="blue"
                                            size="sm"
                                            onClick={() => handleViewPdf(applicant.coverLetter, 'Cover Letter')}
                                        >
                                            View Cover Letter
                                        </Button>
                                    </Stack>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan="4">
                                <Text textAlign="center">No applicants found</Text>
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{pdfType} Viewer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {pdfUrl ? (
                            <iframe src={pdfUrl} width="100%" height="600px" title="PDF Viewer"></iframe>
                        ) : (
                            <Text>No {pdfType.toLowerCase()} is available for this applicant</Text>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ApplicantsTab;
