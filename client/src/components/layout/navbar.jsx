import React, { useEffect, useState } from 'react';
import { Box, Flex, Link, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Image } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/Jobverse.jpeg';

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selected, setSelected] = useState("");
    const location = useLocation();
    const links = [
        { name: "Home", path: "/" },
        { name: "Faq", path: "/faq" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" }
    ];

    const handleSelect = (link) => {
        setSelected(link);
    };

    useEffect(() => {
        const currentLink = links.find(link => link.path === location.pathname);
        if (currentLink) {
            handleSelect(currentLink.name);
        }
    }, []);

    return (
        <Box className="bg-white-500 border-b-2 border-black-900 p-4">
            <Flex justify={["space-between", "space-between", "flex-start", "flex-start"]} align="center">
                <Box>
                    <Link as={NavLink} to="/" onClick={() => handleSelect("Home")}>
                        <Image
                            src={logo}
                            alt="Company Logo"
                            objectFit="contain"
                            aspectRatio="1"
                            width={"90px"}
                            height={"50px"}
                        />
                    </Link>
                </Box>
                <Flex ml={4} display={{ base: 'none', md: 'flex' }}>
                    {links.map((link) => (
                        <Link
                            as={NavLink}
                            to={link.path}
                            key={link.name}
                            px={4}
                            py={2}
                            className="text-black font-semibold"
                            borderBottom={selected === link.name ? "2px solid black" : "none"}
                            onClick={() => handleSelect(link.name)}
                            _hover={{ backgroundColor: 'gray.300' }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </Flex>
                <IconButton
                    display={{ base: 'block', md: 'none' }}
                    icon={<HamburgerIcon />}
                    aria-label="Open Menu"
                    onClick={onOpen}
                />
            </Flex>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Menu</DrawerHeader>
                        <DrawerBody>
                            {links.map((link) => (
                                <Link
                                    as={NavLink}
                                    to={link.path}
                                    key={link.name}
                                    display="block"
                                    px={4}
                                    py={2}
                                    className="text-black font-semibold rounded-lg"
                                    onClick={() => {
                                        handleSelect(link.name);
                                        onClose();
                                    }}
                                    _hover={{ backgroundColor: 'gray.300' }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </Box>
    );
};

export default Navbar;
