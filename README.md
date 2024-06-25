
# Jobverse: Bridging The Gap Between Job Seekers and Employers (Project proposal)


* *Date Created*: 24 JUN 2024
* *Last Modification Date*: 24 JUN 2024
* *Lab URL*: <https://job-verse.vercel.app/>
* *Git URL*: <https://git.cs.dal.ca/venkatasub/csci-4177-5709-grp-11>

## Authors

* [Sivasubramanian Venkatasubramanian](sv386677@dal.ca) - *(Fullstack Developer)*
* [Jeffry Paul Suresh Durai](jeffrypaul.sureshdurai@dal.ca) - *(Fullstack Developer)*
* [Ashish Kumar Guntipalli](as589490@dal.ca) - *(Fullstack Developer)*
* [Bhishman Desai](jy688645@dal.ca) - *(Fullstack Developer)*
* [Sivaprakash Chittu Hariharan](sivaprakash.chittu@dal.ca) - *(Fullstack Developer)*
* [Jayrajsinh Mahavirsinh Jadeja](jy688645@dal.ca) - *(Fullstack Developer)*

## Getting Started### Steps to Set Up the Project   

```   git clone https://git.cs.dal.ca/venkatasub/csci-4177-5709-grp-11.git   cd csci-4177-5709-grp-11/client      npm install     npm start  ```

### Prerequisites

```  Node environment (v20.13.1)```  

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


## Acknowledgments

* For responsive navbar we took inspiration from [indeed]<https://ca.indeed.com/>
