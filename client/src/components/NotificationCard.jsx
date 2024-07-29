import React from 'react';
import {
    Box,
    Heading,
    Text,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex,
} from '@chakra-ui/react';
import { FaBell, FaEllipsisH, FaTrash, FaRocketchat } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const NotificationCard = ({ heading, createdAt, content, onDelete, type, id }) => {
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    return (
        <Box p={4} w="100%" borderWidth="1px" borderRadius="md" boxShadow="md" marginBottom="3" id={id}>
            <Flex>
                {type === 'chat' ? <FaBell className='mt-1' /> : <FaRocketchat className='mt-1' />}
                <Flex direction={"column"} w={"85%"} marginRight={'1'}>
                    <Flex alignItems="center">
                        <Heading size="md" ml={2}>{heading}</Heading>
                    </Flex>
                    <Flex>
                        <Text>
                            {content}
                        </Text>
                    </Flex>
                </Flex>
                <Flex direction={"column"} justifyContent={"center"} w={"15%"}>
                    <Text fontSize="sm" color="gray.500" textAlign={'center'}>{timeAgo}</Text>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<FaEllipsisH />}
                            variant="ghost"
                        />
                        <MenuList>
                            <MenuItem icon={<FaTrash />} onClick={onDelete}>
                                Delete Notification
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    );
};

export default NotificationCard;
