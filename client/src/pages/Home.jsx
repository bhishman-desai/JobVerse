import React from 'react';
import { Box, Flex, Text, Input, Button, Stack } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box
      height="100vh"
      backgroundImage="url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      px={4}
    >
      <Flex
        width={{ base: "100%", sm: "90%", md: "80%", lg: "70%" }}
        flexDirection={{ base: "column", lg: "row" }}
        alignItems="center"
        textAlign="center"
        backgroundColor="rgba(0, 0, 0, 0.4)"
        borderRadius="md"
        p={{ base: 4, sm: 6, md: 8 }}
        justifyContent="space-around"
      >
        <Box flex="1" marginRight={{ lg: "4" }}>
          <Text fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }} mb={4}>
            Are you <Text as="span" color="green.400">candidate</Text> looking for your dream job?
          </Text>
          <Text fontSize={{ base: "lg", sm: "xl", md: "2xl" }} mb={8}>
            Start your job search now!
          </Text>
          
          <Stack spacing={4} width="100%" maxWidth="600px" mb={8}>
            <Input placeholder="Job title, Keywords" variant="filled" backgroundColor="white" color="black"/>
            <Button colorScheme="green" size="lg">Search</Button>
          </Stack>
        </Box>

        <Box flex="1" marginLeft={{ lg: "4" }}>
          <Text fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }} mb={4}>
            Are you an <Text as="span" color="orange.400">employer</Text> looking for the perfect candidate?
          </Text>
          <Text fontSize={{ base: "lg", sm: "xl", md: "2xl" }} mb={8}>
            Post your job now!
          </Text>
          <Button colorScheme="orange" size="lg">I want to recruit now!</Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default Home;
