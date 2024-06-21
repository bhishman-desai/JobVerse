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
            To post a job listing, you can.....
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
            To view submitted job applications for your listing, you can....
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
            To bookmark a job listing, you can....
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
              How do I filter listings based on my profile?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            To filter listings, you can....
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="semibold">
              How do I apply for a job I am interested in?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            To apply for a job, you can
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
            Yes, in order to report a job listing that appears to be fake or a scam, you can...
          </AccordionPanel>
        </AccordionItem>
       
      </Accordion>
    </Box>
  );
}

export default Faq;
