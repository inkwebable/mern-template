# What it is

A mern stack with basic user auth and user login/registration system. Create react app front end in TS and ExpressJS server on the back end.

## Getting Started

Make sure you have node installed and run `npm install` in both the client and server folders.

```javascript
npm install
```

In the server folder copy the .env.example and create a new .env file from it - *see config section for details on mongoDB*

From the root you can run:
```javascript
npm start
```

#### Client proxy

If you are using the above script and not docker then ensure proxy in the client package.json is set to `http://localhost:5001` else it should be set to `http://api:5001`

##### Docker
If you use docker, there is a docker-compose file in the root. Just `docker-compose up ` and go to http://localhost:3000 once everything has booted up. 

*If you are not using docker or a local mongoDB install then you will need to use an online mongoDB provider*

## Config

If using docker mongo DB or installed mongoDB then set **DB_ENV** to `local` (set to anything other than `local` if using online service) & set the necessary **MONGO** env variables.

If you have the full url with username and password you can set the **MONGO_URL** if using an online provider e.g

```javascript
MONGO_URL="mongodb+srv://<username>>:<password>@cluster1-4wa2z.mongodb.net/test?retryWrites=true&w=majority"
```

If you wish to change from the defaults below, you can update them in the env file.

```javascript
MONGO_HOSTNAME=mongo
MONGO_PORT=27017
MONGO_DB=mern
```

If you change MONGO_USER and MONGO_PASSWORD then you must update the script in the root db folder to match.


Login expiration can be set via the **JWT_MAX_AGE** & **JWT_EXPIRES_IN** env variables.
