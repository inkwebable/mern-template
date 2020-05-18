# The Project

A mern stack with basic user auth and user login/registration system. Create react app front end in TS and ExpressJS server on the back end.

[A demo is hosted on Heroku here](https://frozen-ravine-16461.herokuapp.com/) 

## Getting Started

Make sure you have node installed and run npm install in both the client and server folders.

```javascript
npm install
```

In the server folder copy the .env.example and create a new .env file from it

If you don't add **MAIL_USER** & **MAIL_PASSWORD** information ensure **EMAIL_REGISTRATION** is set to **false**.

To start from the server folder:
```javascript
npm run dev
```

####Docker & Kubernetes
If you use docker, there is a docker-compose file in the root. Just docker-compose up. There is also a k8s folder with a readMe for instructions on using Kubernetes.

*If you are not using docker then you will need to use an online mongoDB provider*
