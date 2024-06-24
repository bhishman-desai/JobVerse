import React from 'react';
import { Box, Flex, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';

const Faq = () => {
  return (
    <Box px={[4, 8, 12]} py={[8, 10, 12]}>
      <Flex justify="center" align="center">
        <Text as="h1" fontSize="2xl" fontWeight="bold" py={10}>Frequently Asked Questions</Text>
      </Flex>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
                How do I post a job listing?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            To post a job listing:
            <ol>
        <li>1. Navigate to the 'Job Management' section.</li>
        <li>2. Click on the 'Create Job Posting' button.</li>
        <li>3. Enter the job details in the form that is displayed.</li>
        <li>4. Click on the 'Submit' button.</li>
        <li>5. You will now see a confirmation message indicating successful job posting creation.</li>
    </ol>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
              How do I view applications for my job listing?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            To view submitted job applications for your listing:
            <ol>
            <li>1. Navigate to the 'Job Management' section.</li>
            <li>2. Click on the 'View Job Postings' link.</li>
            <li>3. You will see a list of all the job postings that you have created.</li>
            <li>4. Select a job posting for which you wish to view applications.</li>
            <li>5. All submitted job applications for that listing are now displayed.</li> 
    </ol>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
              How do I bookmark a job listing?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            To bookmark a job listing:
            <ol>
            <li>1. Navigate to the 'Job Management' section, where you will see the job listings.</li>
            <li>2. Click on the bookmark icon near the job listing that you wish to bookmark.</li>
            <li>3. The job listing will now be added to your list of bookmarked jobs.</li>
    </ol>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
              How do I apply search filters to the job listings?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            To filter listings:
            <ol>
            <li>1. Enter the keywords based on which you want to filter jobs, in the search field.</li>
            <li>2. You may also filter based on the job location, by choosing the location in the location input field.</li>
            <li>3. Click on the search button.</li>
            <li>4. The job listings will now appear based on the search filters applied.</li>
    </ol>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
              How do I apply for a job that I am interested in?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            In order to apply for a job:
            <ol>
            <li>1. Click on the "Apply" button on the job listing that you are applying for.</li>
            <li>2. An application form opens up, where you can provide your information and upload your resume.</li>
            <li>3. Click on the "Submit" button.</li>
            <li>4. Once the application has been validated, you will receive a confirmation message.</li>
    </ol>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
              Is there a way to report fraudulent job listings?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Yes, in order to report a job listing that appears to be fake or a scam:
            <ol>
            <li>1. Click on the "Report" button on the job listing that you wish to report.</li>
            <li>2. A form opens up, prompting you to fill in the details of your report against the listing.</li>
            <li>3. Click on the "Submit" button.</li>
            <li>4. The submitted report will be reviewed by the administrators, followed by appropriate action taken.</li>
    </ol>
          </AccordionPanel>
        </AccordionItem>
       
      </Accordion>
    </Box>
  );
}

export default Faq;
