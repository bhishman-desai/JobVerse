/* Author: Jeffry Paul Suresh Durai */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import avatar from '../assets/Profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faArrowLeft, faCommentDots, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const socket = io('http://localhost:8080');

const ChatWidget = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [interactedUsers, setInteractedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [unreadMessages, setUnreadMessages] = useState({});
  const [isMinimized, setIsMinimized] = useState(true);

  const currentUsername = sessionStorage.getItem('username');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        const fetchedUsers = response.data.filter(user => user.username !== currentUsername);
        setUsers(fetchedUsers);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      if (message.senderUsername !== currentUsername && message.receiverUsername === currentUsername) {
        if (selectedUser && selectedUser.username === message.senderUsername) {
          setUnreadMessages((prevUnread) => {
            const updatedUnread = { ...prevUnread, [message.senderUsername]: 0 };
            localStorage.setItem('unreadMessages', JSON.stringify(updatedUnread));
            return updatedUnread;
          });
        } else {
          setUnreadMessages((prevUnread) => {
            const updatedUnread = { ...prevUnread, [message.senderUsername]: (prevUnread[message.senderUsername] || 0) + 1 };
            localStorage.setItem('unreadMessages', JSON.stringify(updatedUnread));
            return updatedUnread;
          });
        }
      }
    });

    socket.on('chatHistory', (chatHistory) => {
      setMessages(chatHistory);
    });

    socket.on('interactedUsers', (interactedUsers) => {
      const filteredInteractedUsers = interactedUsers.filter(username => username !== currentUsername);
      setInteractedUsers(filteredInteractedUsers);
    });

    const storedUnreadMessages = JSON.parse(localStorage.getItem('unreadMessages')) || {};
    setUnreadMessages(storedUnreadMessages);

    if (currentUsername) {
      socket.emit('joinChat', currentUsername);
    }

    return () => {
      socket.off('receiveMessage');
      socket.off('chatHistory');
      socket.off('interactedUsers');
    };
  }, [currentUsername, selectedUser]);

  useEffect(() => {
    filterUsers(searchTerm, users);
  }, [searchTerm, users]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filterUsers = (term, userList) => {
    if (!term) {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(
        userList.filter(user =>
          user.username.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages([]);
    socket.emit('joinChat', currentUsername);

    setUnreadMessages((prevUnread) => {
      const updatedUnread = { ...prevUnread, [user.username]: 0 };
      localStorage.setItem('unreadMessages', JSON.stringify(updatedUnread));
      return updatedUnread;
    });
  };

  const handleSendMessage = () => {
    if (newMessage && selectedUser && currentUsername) {
      if (currentUsername === selectedUser.username) {
        console.error('Cannot send message to yourself');
        return;
      }

      const message = {
        senderUsername: currentUsername,
        receiverUsername: selectedUser.username,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };

      socket.emit('sendMessage', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    } else {
      if (!newMessage) console.error('Message text is missing');
      if (!selectedUser) console.error('No user selected');
      if (!currentUsername) console.error('No username found');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const formatDateHeader = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((acc, message) => {
      const date = formatDateHeader(message.timestamp);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
      return acc;
    }, {});
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const groupedMessages = groupMessagesByDate(
    messages.filter(
      (m) => m.senderUsername === selectedUser?.username || m.receiverUsername === selectedUser?.username
    )
  );

  return (
    <div>{isMinimized ? (
      <div className="fixed right-5 bottom-5">
        <button
          className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black"
          onClick={() => setIsMinimized(false)}
        >
          <FontAwesomeIcon icon={faCommentDots} className="text-2xl" />
        </button>
      </div>
    ) : (
      <div className="w-80 h-[650px] border border-gray-300 p-4 fixed right-5 bottom-5 bg-white">
        <button
          className="absolute top-2 right-2 w-8 h-8 mt-3 rounded-full flex items-center justify-center transition-all duration-300"
          onClick={() => setIsMinimized(true)}
        >
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
        {!selectedUser && (
          <>
            <div className="flex items-center text-left border-b border-gray-300 shadow-sm pb-2 mb-2">
              <img
                src={currentUsername.profile || avatar}
                alt={currentUsername}
                className="w-10 h-10 rounded-full mr-2"
              />
              <h3 className="m-0 font-bold">Messaging</h3>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="w-full p-2 mb-2 mt-2 bg-gray-200 rounded"
            />
            <div className="h-[490px] overflow-y-auto border border-gray-200 rounded">
              {searchTerm ? (
                <ul className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <li
                      key={user.username}
                      className="flex items-center p-1 cursor-pointer transition-all hover:bg-gray-200"
                      onClick={() => handleUserClick(user)}
                    >
                      <img
                        src={user.profile || avatar}
                        alt={user.username}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <span>{user.username}</span>
                      {unreadMessages[user.username] > 0 && (
                        <span className="ml-auto text-red-500">
                          {unreadMessages[user.username]}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {interactedUsers.map((username) => (
                    <li
                      key={username}
                      className="flex items-center p-1 cursor-pointer transition-all hover:bg-gray-200"
                      onClick={() => handleUserClick({ username })}
                    >
                      <img
                        src={avatar}
                        alt={username}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <span>{username}</span>
                      {unreadMessages[username] > 0 && (
                        <span className="ml-auto text-red-500">!</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
        {selectedUser && (
          <>
            <div className="flex items-center mb-2 border-b border-gray-300 shadow-sm pb-2">
              <FontAwesomeIcon
                icon={faArrowLeft}
                onClick={handleBackClick}
                className="cursor-pointer mr-2"
              />
              <img
                src={selectedUser.profile || avatar}
                alt={selectedUser.username}
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="font-bold">{selectedUser.username}</span>
            </div>
            <div className="h-[490px] overflow-y-auto pr-1">
              {Object.entries(groupedMessages).map(([date, messages]) => (
                <div key={date}>
                  <div className="text-center text-gray-500 mb-2 text-xs">{date}</div>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-2 flex ${message.senderUsername === currentUsername
                        ? 'justify-end'
                        : 'justify-start'
                        }`}
                    >
                      <div
                        className={`p-2 rounded max-w-[85%] flex flex-col ${message.senderUsername === currentUsername
                          ? 'bg-blue-100 text-left'
                          : 'bg-gray-100 text-left'
                          }`}
                      >
                        <div className="text-sm">{message.text}</div>
                        <div className="text-xs text-gray-500 self-end">
                          {formatDate(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center mt-6">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="inline-flex items-center justify-center ml-2">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  onClick={handleSendMessage}
                  className="cursor-pointer text-black-500 text-xl"
                />
              </div>
            </div>
          </>
        )}
      </div>
    )}
    </div>
  );
};

export default ChatWidget;
