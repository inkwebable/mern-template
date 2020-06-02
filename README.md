# What it is

A mern stack with basic user auth and user login/registration system. Create react app front end in TS and ExpressJS server on the back end.

[A demo is hosted on Heroku here](https://frozen-ravine-16461.herokuapp.com/) 

## Getting Started

Make sure you have node installed and run `npm install` in both the client and server folders.


In the server folder copy the .env.example and create a new .env file from it - *see config section for details on mongoDB*

To start via npm from the root folder:
```javascript
npm run dev
```

##### Docker & Kubernetes
If you use Docker, there is a docker-compose file in the root. Just `docker-compose up --build` and go to http://localhost:3000 
once everything has booted up.

There is also a k8s folder with a README for instructions on using Kubernetes.

*If you are not using docker/kubernetes or a local mongoDB install then you will need to use an online mongoDB provider*

##### Client proxy

If you are using `npm start` and not docker or kubernetes then ensure proxy in the client package.json is set to `http://localhost:5001` else it should be set to `http://api:5001`

## Config

If using docker mongo DB set **DB_ENV** to `local` (set to anything other than `local` if using an online service) & set the necessary **MONGO** env variables.

If you have the full url with username and password you can set the MONGO_URL if using an online provider e.g
```dotenv
MONGO_URL="mongodb+srv://<username>>:<password>@cluster1-4wazz.mongodb.net/test?retryWrites=true&w=majority"
```

If you want to use the email system for user registration then set **EMAIL_REGISTRATION** to **true**
and be sure to set **MAIL_USER** & **MAIL_PASSWORD**.

For local user login and registration without emails set **EMAIL_REGISTRATION** to **false**.

Login expiration can be set via the **JWT_MAX_AGE** & **JWT_EXPIRES_IN** env variables.

## Testing

Client - see the README

Server - in the server folder `npm run test`
