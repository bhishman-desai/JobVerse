/* Jayrajsinh Mahavirsinh Jadeja */

import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Heading,
  Stack,
  Input,
  Button,
  useToast,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { fetchUserProfile, updateUserProfile } from "./helper/userApis"; // Adjust the import path as needed

const ProfileManagement = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const toast = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
        setName(userProfile.name);
        setEmail(userProfile.email);
        setBio(userProfile.bio);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [toast]);

  const handleSave = async () => {
    try {
      await updateUserProfile({ name, email, bio });
      toast({
        title: "Success",
        description: "Profile updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!profile) {
    return (
      <Center h="100vh">
        <Text fontSize="lg" color="gray.500">
          Profile not found
        </Text>
      </Center>
    );
  }

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Heading as="h1" size="2xl" mb={4}>
        Profile Management
      </Heading>
      <Stack spacing={4}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSave}>
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfileManagement;
