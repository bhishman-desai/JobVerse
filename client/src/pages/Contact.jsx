import React, { useState } from "react";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    return /^[A-Za-z]+$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    } else if (!validateName(formData.name)) {
      newErrors.name = "Name should only contain letters";
      valid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (formData.message.trim() === "") {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form data:", formData);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    }
  };

  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          background={"#f4f6f7"}
          color="black"
          borderRadius="lg"
          m={{ sm: 2, md: 16, lg: 10 }}
          p={{ sm: 2, md: 4, lg: 6 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact Us!</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="black">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}
                      >
                        +1-9999999999
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={
                          <MdOutlineEmail color="#1970F1" size="20px" />
                        }
                      >
                        hello@abc.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                      >
                        Halifax, Canada
                      </Button>
                    </VStack>
                  </Box>
                  <Link to={"/"}>
                    <Button> Go back!</Button>
                  </Link>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input
                            type="text"
                            placeholder="Name"
                            size="md"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </InputGroup>
                        {errors.name && <Text color="red">{errors.name}</Text>}
                      </FormControl>
                      <FormControl id="email">
                        <FormLabel>Your Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input
                            type="text"
                            placeholder="Email"
                            size="md"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                        </InputGroup>
                        {errors.email && (
                          <Text color="red">{errors.email}</Text>
                        )}
                      </FormControl>
                      <FormControl id="message">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          placeholder="Enter your message here!"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                        />
                        {errors.message && (
                          <Text color="red">{errors.message}</Text>
                        )}
                      </FormControl>
                      <FormControl id="submit" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}
                          onClick={handleSubmit}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Contact;
