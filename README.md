# What it is

A mern stack with basic user auth and user login/registration system. Create react app front end in TS and ExpressJS server on the back end.

[A demo is hosted on Heroku here](https://frozen-ravine-16461.herokuapp.com/) 

## Getting Started

Make sure you have node installed and run npm install in both the client and server folders.

```javascript
npm install
```

In the server folder copy the .env.example and create a new .env file from it

To start from the server folder:
```javascript
npm run dev
```

##### Docker & Kubernetes
If you use docker, there is a docker-compose file in the root. Just docker-compose up --build and go to http://localhost:3000. 

There is also a k8s folder with a README for instructions on using Kubernetes.

*If you are not using docker/kubernetes or a local mongoDB install then you will need to use an online mongoDB provider*

## Config

If using docker mongo DB set **DB_ENV** to local & set the neccessary **MONGO** env variables.

If you want to use the email system for user registration then set **EMAIL_REGISTRATION** to **true**
and be sure to set **MAIL_USER** & **MAIL_PASSWORD**.

For local user login and registgration without emails set **EMAIL_REGISTRATION** to **false**.

Login expiration can be set via the **JWT_MAX_AGE** & **JWT_EXPIRES_IN** env variables.
