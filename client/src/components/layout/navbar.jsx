import React, { useEffect, useState } from 'react';
import {
  Box, Flex, Link, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Image, Button, Icon, Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBell, FaUser } from 'react-icons/fa';
import logo from '../../assets/Jobverse.jpeg';
import { useSocketStore } from '../../store/store';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const links = [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
    { name: "About", path: "/about" },
    { name: "Contact us", path: "/contact-us" }
  ];

  const newNotification = useSocketStore((state) => state.newNotification);
  const clearNewNotification = useSocketStore((state) => state.clearNewNotification);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn based on token presence
  }, []);

  const handleSelect = (link) => {
    setSelected(link);
  };

  useEffect(() => {
    const currentLink = links.find(link => link.path === location.pathname);
    if (currentLink) {
      handleSelect(currentLink.name);
    }
  }, [location.pathname]);

  const handleNotificationClick = () => {
    clearNewNotification();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

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
        <Flex ml="auto">
          {isLoggedIn ? (
            <>
              <Link
                as={NavLink}
                to="/notifications"
                px={4}
                py={2}
                onClick={handleNotificationClick}
                _hover={{ backgroundColor: 'gray.300' }}
              >
                <Box position="relative" display="inline-block">
                  <Icon as={FaBell} boxSize={6} />
                  {newNotification && (
                    <Box
                      position="absolute"
                      top="0"
                      right="0"
                      width="8px"
                      height="8px"
                      borderRadius="50%"
                      backgroundColor="orange"
                    />
                  )}
                </Box>
              </Link>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <Icon as={FaUser} boxSize={6} />
                </MenuButton>
                <MenuList>
                  <MenuItem as={NavLink} to="/profile">Update Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Button as={NavLink} to="/login" ml={4}>
              Login
            </Button>
          )}
          <IconButton
            display={{ base: 'block', md: 'none' }}
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            onClick={onOpen}
            className="ml-3"
          />
        </Flex>
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
              {isLoggedIn ? (
                <>
                  <Link
                    as={NavLink}
                    to="/profile"
                    display="block"
                    px={4}
                    py={2}
                    className="text-black font-semibold rounded-lg"
                    _hover={{ backgroundColor: 'gray.300' }}
                  >
                    Update Profile
                  </Link>
                  <Link
                    display="block"
                    px={4}
                    py={2}
                    className="text-black font-semibold rounded-lg"
                    onClick={() => {
                      handleLogout();
                      onClose();
                    }}
                    _hover={{ backgroundColor: 'gray.300' }}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <Link
                  as={NavLink}
                  to="/login"
                  display="block"
                  px={4}
                  py={2}
                  className="text-black font-semibold rounded-lg"
                  onClick={onClose}
                  _hover={{ backgroundColor: 'gray.300' }}
                >
                  Login
                </Link>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Navbar;
