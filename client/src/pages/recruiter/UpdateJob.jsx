import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Input, Button, Select, Textarea, Box } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to get job ID from URL

function UpdateJob() {

    const navigate = useNavigate(); 

    const { id } = useParams(); // Get job ID from URL params
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [numPositions, setNumPositions] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [resumeRequired, setResumeRequired] = useState(false);
    const [coverLetterRequired, setCoverLetterRequired] = useState(false);

    // Fetch job details on component mount
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/recruiter/getJobById/${id}`);
                const job = response.data; // Assuming the API response structure has a 'job' field
                console.log(response)
                setPosition(job.positionName);
                setSalary(job.salary.toString());
                setNumPositions(job.positionsAvailable.toString());
                setJobDescription(job.jobDescription);
                setResumeRequired(job.resumeRequired);
                setCoverLetterRequired(job.coverLetterRequired);
            } catch (error) {
                console.error('Error fetching job details:', error);
                // Handle error states (e.g., show error message to user)
            }
        };

        fetchJobDetails();
    }, [id]); // Ensure useEffect runs whenever 'id' changes (job ID from URL)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/api/recruiter/updateJob/${id}`, {
                positionName: position,
                salary: parseInt(salary),
                positionsAvailable: parseInt(numPositions),
                jobDescription: jobDescription,
                resumeRequired: resumeRequired,
                coverLetterRequired: coverLetterRequired,
            });

            console.log('Job listing updated:', response.data);
            navigate(`/recruiter/dashboard`); 
        } catch (error) {
            console.error('Error updating job listing:', error);
        }
    };

    return (
        <>
            <Heading as='h2' size='xl' align='center' mb='4'>
                Update Job Listing
            </Heading>
            <Box maxWidth='600px' mx='auto'>
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Name of Position:</FormLabel>
                        <Input type='text' value={position} onChange={(e) => setPosition(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Salary (in $): </FormLabel>
                        <Input type='number' value={salary} onChange={(e) => setSalary(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Number of Positions:</FormLabel>
                        <Input type='number' value={numPositions} onChange={(e) => setNumPositions(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Job Description and Details:</FormLabel>
                        <Textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Resume Required?</FormLabel>
                        <Select
                            id='resume'
                            name='resume'
                            value={resumeRequired}
                            onChange={(e) => setResumeRequired(e.target.value === 'true')}
                        >
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Cover Letter Required?</FormLabel>
                        <Select
                            id='cover'
                            name='cover'
                            value={coverLetterRequired}
                            onChange={(e) => setCoverLetterRequired(e.target.value === 'true')}
                        >
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </Select>
                    </FormControl>
                    <br />

                    <Box maxWidth='100px' mx='auto'>
                        <Button colorScheme='teal' type='submit'>
                            Update Job
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
}

export default UpdateJob;
