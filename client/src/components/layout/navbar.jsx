import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
    return (
        <Box className="bg-white-500 border-b-2 border-black-900 p-4">
            <Flex justify="space-between" align="center">
                <Box className="text-black text-xl font-bold">Company Logo</Box>
                <Link to="/faq">
                    <button className="text-black font-semibold px-4 py-2 rounded-lg border border-black-900 hover:bg-gray-300">
                        FAQ
                    </button>
                </Link>
            </Flex>
        </Box>
    );
};

export default Navbar;