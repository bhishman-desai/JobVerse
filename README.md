# Jobverse: Bridging The Gap Between Job Seekers and Employers


* *Date Created*: 10 AUG 2024
* *Last Modification Date*: 10 AUG 2024
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


## Acknowledgments

* For responsive navbar we took inspiration from [Indeed](https://ca.indeed.com/)
* For Home Landing page the Jobillico website home is taken as inspiration [Jobillico](https://www.jobillico.com/en)
