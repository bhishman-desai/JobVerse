# Jobverse: Bridging The Gap Between Job Seekers and Employers (Assignment 3)


* *Date Created*: 24 JUN 2024
* *Last Modification Date*: 30 JUL 2024
* *Lab URL*: <https://job-verse.vercel.app/>
* *Git URL*: <https://git.cs.dal.ca/venkatasub/csci-4177-5709-grp-11/-/tree/sivasubramanian>

## Authors

* [Sivasubramanian Venkatasubramanian](sv386677@dal.ca) - *(Fullstack Developer)*
* [Jeffry Paul Suresh Durai](jeffrypaul.sureshdurai@dal.ca) - *(Fullstack Developer)*
* [Ashish Kumar Guntipalli](as589490@dal.ca) - *(Fullstack Developer)*
* [Bhishman Desai](bhishman@dal.ca) - *(Fullstack Developer)*
* [Sivaprakash Chittu Hariharan](sivaprakash.chittu@dal.ca) - *(Fullstack Developer)*
* [Jayrajsinh Mahavirsinh Jadeja](jy688645@dal.ca) - *(Fullstack Developer)*

## Getting Started
### Steps to Set Up the Project   

```   
git clone https://git.cs.dal.ca/venkatasub/csci-4177-5709-grp-11.git   
```

``` 
cd csci-4177-5709-grp-11/client      
npm install     
npm start  
``` 

``` 
cd csci-4177-5709-grp-11/server      
npm install     
node server.js
``` 
### Prerequisites

```  
Node environment (v20.13.1) 

```  

## Deployment

We deployed our web application using GitHub Vercel and Render. First, We created a new private repository on GitHub and pushed my project code to it. Then, We imported this repository into Vercel and Render, configured the build settings, and initiated the deployment.  

## Built With

* [React](https://react.dev/learn) - The web framework used
* [npm](https://docs.npmjs.com) - Dependency Management
* [express](https://expressjs.com/) -  used to build the server side application
* [mongodb](https://www.mongodb.com/) - used to store data

## List of features developed
 - Notification
    - Implemented web socket connection using socket.io in frontend and backend to send notify users in real time without refreshing the screen
    - created a zustand store to provide navabr and notifications components with realtime updates.
    - Notification icon would have orange dot on top once if there a new message.
    - Student will have notification when their job application gets updated or when some one trys to reach them out via chat
    - Recruitter will have notification when students apply to the job they posted or when some one trys to reach them out via chat.
 * Navigation bar
    - implemented responsive navbar
    - showing navbar links based on login status and logged in users role (student, recruiter).
## List of files created
### Frontend
- notifications.jsx
- NotificationCard.jsx
- store.js
### Backend
- Notification.js (model)
- NotificationsController.js
- NotificationRoute.js
- socketConnection.js

## Sources Used

### socketConnection.js

*Lines 13 - 151*

```
io.on("connection", async (socket) => {
  const projects = await fetchProjects(socket);

  projects.forEach(project => socket.join("project:" + project.id));

  // and then later
  io.to("project:4321").emit("project updated");
});

io.on("connection", socket => {
  socket.on("disconnecting", () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
  });

  socket.on("disconnect", () => {
    // socket.rooms.size === 0
  });
});
```

The code above was created by adapting the code in [Socket.IO](https://socket.io/docs/v4/rooms/#joining-and-leaving) as shown below: 

```
const initializeSocket = (server) => {
  if (io) {
    console.log('Socket.io already initialized');
    return io;
  }

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected');
    const userId = socket.userId;

    socket.join(userId);
    console.log(`User ${userId} joined room`);

    socket.on('joinChat', async (username) => {
      socket.join(username);

      const messages = await Message.find({
        $or: [{
          senderUsername: username
        }, {
          receiverUsername: username
        }]
      }).sort({
        timestamp: 1
      });

      socket.emit('chatHistory', messages);

      const userInteraction = await UserInteraction.findOne({
        username
      });
      const interactedUsers = userInteraction ? userInteraction.interactedUsers : [];
      socket.emit('interactedUsers', interactedUsers);
    });

    socket.on('leaveChat', (userName) => {
      socket.leave(userName);
      console.log(`User with username ${userName} left chat ${userName}`);
      notifiedUsers.forEach((key) => {
        if (key.endsWith(`_${socket.id}`)) {
          notifiedUsers.delete(key);
        }
      });
    });

    socket.on('sendMessage', async (message) => {
      const newMessage = new Message(message);
      await newMessage.save();

      await UserInteraction.updateOne({
        username: message.senderUsername
      }, {
        $addToSet: {
          interactedUsers: message.receiverUsername
        }
      }, {
        upsert: true
      });
      await UserInteraction.updateOne({
        username: message.receiverUsername
      }, {
        $addToSet: {
          interactedUsers: message.senderUsername
        }
      }, {
        upsert: true
      });

      io.to(message.receiverUsername).emit('receiveMessage', message);

      const userKey = `${message.receiverUsername}_${socket.id}`;
      const receiverRoom = io.sockets.adapter.rooms.get(message.receiverUsername);
      const isReceiverPresent = receiverRoom && receiverRoom.size > 0;
      console.log((!notifiedUsers.has(userKey)))
      if ((!notifiedUsers.has(userKey)) && (!isReceiverPresent)) {
        sendNotification(
          message.receiverUsername,
          message.senderUsername,
          'New Message',
          `${message.senderUsername} has sent you a message.`,
          'chat'
        );
        notifiedUsers.add(userKey);
      }

    });
  });

  return io;
};

const sendNotification = async (userName, senderUserName, heading, content, type) => {
  const receiverUser = await UserModel.findOne({
    username: userName
  });
  try {
    const newNotification = new Notification({
      userName,
      senderUserName,
      heading,
      content,
      type,
    });
    await newNotification.save();
    const receiverIdStr = receiverUser && receiverUser._id.toString();
    io.to(receiverIdStr).emit('notification', {
      heading,
      content,
      type,
      createdAt: newNotification.createdAt,
      senderUserName,
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};


```

- The code in [Socket.IO](https://socket.io/docs/v4/rooms/#joining-and-leaving) was implemented by throughouly understanding the web socket concept.
- [Socket.IO](https://socket.io/docs/v4/rooms/#joining-and-leaving)'s Code was used because it would provide realtime update of notifications.
- [Socket.IO](https://socket.io/docs/v4/rooms/#joining-and-leaving)'s Code was modified by creating own rooms for users where the would be listening for new notifications.

### store.js

*Lines 32 - 196*

``` 
 export const useSocketStore = create((set) => ({
  notifications: [],
  newNotification: false,
  messages: [],
  users: [],
  interactedUsers: [],
  unreadMessages: {},

  // Initialize the socket connection
  initializeSocket: async (token, username) => {
    if (socket) return;

    socket = io(process.env.REACT_APP_SERVER_DOMAIN, {
      auth: {
        token
      },
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('notification', (notification) => {
      set((state) => ({
        notifications: [notification, ...state.notifications],
        newNotification: true,
      }));
    });

    socket.on('receiveMessage', (message) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
      if (message.senderUsername !== username && message.receiverUsername === username) {
        set((state) => ({
          unreadMessages: {
            ...state.unreadMessages,
            [message.senderUsername]: (state.unreadMessages[message.senderUsername] || 0) + 1,
          },
        }));
      }
    });

    socket.on('chatHistory', (chatHistory) => {
      set({
        messages: chatHistory
      });
    });

    socket.on('interactedUsers', (interactedUsers) => {
      set({
        interactedUsers
      });
    });
  },
  joinChat: (username) => {
    if (socket) {
      socket.emit('joinChat', username);
    }
  },

  leaveChat: (username) => {
    if (socket) {
      socket.emit('leaveChat', username);
    }
  },

  // Fetch notifications from the server
  fetchNotifications: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set({
        notifications: response.data
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  },

  // Mark all notifications as read
  markNotificationsAsRead: async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/notifications/mark-read`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          isRead: true
        })),
        newNotification: false,
      }));
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  },

  deleteNotification: async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set((state) => ({
        notifications: state.notifications.filter((n) => n._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  },

  clearNewNotification: () => set({
    newNotification: false
  }),

  fetchUsers: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const loggedInUsername = localStorage.getItem('username');
      console.log(loggedInUsername)
      const filteredUsers = response.data.filter(user => user.username !== loggedInUsername);
      set({
        users: filteredUsers
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },

  sendMessage: (message) => {
    if (socket) {
      socket.emit('sendMessage', message);
      set((state) => ({
        messages: [...state.messages, message],
      }));
    }
  },

  // Clear unread messages for a specific user
  clearUnreadMessages: (username) => {
    set((state) => ({
      unreadMessages: {
        ...state.unreadMessages,
        [username]: 0,
      },
    }));
    localStorage.setItem('unreadMessages', JSON.stringify({
      ...JSON.parse(localStorage.getItem('unreadMessages') || '{}'),
      [username]: 0,
    }));
  },
})); 
```  

The code above was created by adapting the code in [Pmndrs.docs](https://docs.pmnd.rs/zustand/getting-started/introduction) as shown below:


```
import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))

function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} around here...</h1>
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}

```

[Pmndrs.docs](https://docs.pmnd.rs/zustand/getting-started/introduction)'s code was used because I wanted to use a storage which can be acessed across components who are siblings.

[Pmndrs.docs](https://docs.pmnd.rs/zustand/getting-started/introduction)'s code was modified by adding my very one store to manage socket related operations.


## Acknowledgments

* For notifications I took inspiration from [Indeed](https://ca.indeed.com/)
