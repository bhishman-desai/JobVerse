# Jobverse: Bridging The Gap Between Job Seekers and Employers (Project proposal)


* *Date Created*: 24 JUN 2024
* *Last Modification Date*: 24 JUN 2024
* *Lab URL*: <https://job-verse.vercel.app/>
* *Git URL*: <https://git.cs.dal.ca/venkatasub/csci-4177-5709-grp-11>

## Authors

* [Sivasubramanian Venkatasubramanian](sv386677@dal.ca) - *(Fullstack Developer)*
* [Jeffry Paul Suresh Durai](jeffrypaul.sureshdurai@dal.ca) - *(Fullstack Developer)*
* [Ashish Kumar Guntipalli](as589490@dal.ca) - *(Fullstack Developer)*
* [Bhishman Desai](bhishman@dal.ca) - *(Fullstack Developer)*
* [Sivaprakash Chittu Hariharan](sivaprakash.chittu@dal.ca) - *(Fullstack Developer)*
* [Jayrajsinh Mahavirsinh Jadeja](jy688645@dal.ca) - *(Fullstack Developer)*

## Getting Started
### Steps to Set Up the Project   

```   git clone https://git.cs.dal.ca/venkatasub/csci-4177-5709-grp-11.git   
cd csci-4177-5709-grp-11/client      
npm install     
npm start  
```

### Prerequisites

```  
Node environment (v20.13.1) 

```  

## Deployment

We deployed our web application using GitHub and Vercel. First, We created a new private repository on GitHub and pushed my project code to it. Then, We imported this repository into Vercel, configured the build settings, and initiated the deployment.  

## Built With

* [React](https://react.dev/learn) - The web framework used
* [npm](https://docs.npmjs.com) - Dependency Management

## Sources Used

### App.js

*Lines 7 - 20*

```
const Home = lazy(() => import("./pages/Home"));
const FaqPage = lazy(() => import("./pages/Faq"));
const ContactPage = lazy(() => import("./pages/Contact"));

/* Auth Pages */
const UserNamePage = lazy(() => import("./pages/auth/Username"));
const PasswordPage = lazy(() => import("./pages/auth/Password"));
const RegisterPage = lazy(() => import("./pages/auth/Register"));
const ProfilePage = lazy(() => import("./pages/auth/Profile"));
const RecoveryPage = lazy(() => import("./pages/auth/Recovery"));
const ResetPage = lazy(() => import("./pages/auth/Reset"));

/* Page Not Found */
const PageNotFoundPage = lazy(() => import("./components/pageNotFound"));

```

The code above was created by adapting the code in [react.dev](https://react.dev/reference/react/lazy) as shown below: 

```
const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

```

- The code in [react.dev](https://react.dev/reference/react/lazy) was implemented by throughouly understanding the lazy loading concept.
- [react.dev](https://react.dev/reference/react/lazy)'s Code was used because it improves the application perfomance by reducing the initial load time.
- [react.dev](https://react.dev/reference/react/lazy)'s Code was modified by using our own component instead of the own given in example.

### Background.png

The image used in this project was sourced from [Pexels](https://www.pexels.com/).


### validate.js

*Lines 50 - 76*

``` js
function passwordVerify(errors = {}, values) {
  
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const lowerCase = /[a-z]/;
  const upperCase = /[A-Z]/;
  const number = /[0-9]/;

  if (!values.password) {
    errors.password = toast.error("Password Required!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Invalid Password!");
  } else if (values.password.length < 8) {
    errors.password = toast.error(
      "Password must be at least 8 characters long!",
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must contain a special character!");
  } else if (!lowerCase.test(values.password)) {
    errors.password = toast.error("Password must contain a lowercase letter!");
  } else if (!upperCase.test(values.password)) {
    errors.password = toast.error("Password must contain an uppercase letter!");
  } else if (!number.test(values.password)) {
    errors.password = toast.error("Password must contain a number!");
  }

  return errors;
}   
  
```  

The code above was created by adapting the code in [Wiktor Stribiżew](https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a) as shown below:


```js

"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"

```

[Wiktor Stribiżew](https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a)'s code was used because I wanted to add regex checks for password validation and wanted to make sure that I don't miss out on any edge cases.

[Wiktor Stribiżew](https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a)'s code was modified by breaking down the regex into different regex each serving their own purpose.

### convert.js

*Lines 1 - 15*

``` js
/* Image to base64 */
export default function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}
  
```  

The code above was created by adapting the code in [Dmitri Pavlutin](https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript) as shown below:


```js
function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     console.log(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

var file = document.querySelector('#files > input[type="file"]').files[0];
getBase64(file); // prints the base64 string
```



[Dmitri Pavlutin](https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript)'s code was used because I wanted to convert file to base64 in JavaScript. This is mainly to let users upload their profile pictures at the time of user registration process.

[Dmitri Pavlutin](https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript)'s code was modified by instead of directly logging the result or error, I wrapped the FileReader operations within a Promise for my use case. This way I was able to use resolve to return the base64 string upon successful reading and reject to handle any errors.



ChatGPT was used to generate the basic chat functionality. 
This code was further modified to include the following:

* Persisting chat messages and previously interacted users in database.
* Displaying all past chat messages and the users previously interacted with in the chat list.
* Displaying timestamps under messages and grouping messages by dates.
* Displaying a symbol next to a user in the chat list to indicate the presence of unread messages in the chat. 

The prompt given was:
"Generate code for a React app that implements a live chat functionality between the currently logged in user and other users."

The code generated was:

### models/Chat.js

```
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ChatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [MessageSchema]
});

export default mongoose.model('Chat', ChatSchema);
```

### routes/chat.js

```
import express from 'express';
import Chat from '../models/Chat';
import User from '../models/User';
const router = express.Router();

// Create a new chat
router.post('/create', async (req, res) => {
  const { users } = req.body;
  const chat = new Chat({ users, messages: [] });
  await chat.save();
  res.status(201).json(chat);
});

// Send a message
router.post('/message', async (req, res) => {
  const { chatId, sender, receiver, message } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ message: 'Chat not found' });
  }
  chat.messages.push({ sender, receiver, message });
  await chat.save();
  res.status(201).json(chat);
});

// Get all chats for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const chats = await Chat.find({ users: userId }).populate('users').populate('messages.sender').populate('messages.receiver');
  res.status(200).json(chats);
});

export default router;
```

### server.js

```
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat';
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected!'))
  .catch(err => console.error(err));

app.use('/api/chat', chatRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
```

### src/components/Chat/ChatList.js

```
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChatList = ({ userId }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios.get(`/api/chat/${userId}`).then(response => {
      setChats(response.data);
    });
  }, [userId]);

  return (
    <div>
      {chats.map(chat => (
        <Link key={chat._id} to={`/chat/${chat._id}`}>
          {chat.users.map(user => user._id !== userId && <div key={user._id}>{user.username}</div>)}
        </Link>
      ))}
    </div>
  );
};

export default ChatList;
```

### src/components/Chat/ChatBox.js

```
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChatBox = ({ userId }) => {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`/api/chat/${chatId}`).then(response => {
      setChat(response.data);
    });
  }, [chatId]);

  const sendMessage = () => {
    axios.post('/api/chat/message', {
      chatId,
      sender: userId,
      receiver: chat.users.find(user => user._id !== userId)._id,
      message
    }).then(response => {
      setChat(response.data);
      setMessage('');
    });
  };

  return (
    <div>
      <div>
        {chat && chat.messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender.username}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
```

## Acknowledgments

* For responsive navbar we took inspiration from [Indeed](https://ca.indeed.com/)
* For Home Landing page the Jobillico website home is taken as inspiration [Jobillico](https://www.jobillico.com/en)
