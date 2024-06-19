import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const Navbar = () => {
    return (
        <Box className="bg-white-500 border-b-2 border-black-900 p-4">
            <Flex justify="space-between" align="center">
                <Box className="text-black text-xl font-bold">Company Logo</Box>
            </Flex>
        </Box>
    );
};

export default Navbar;