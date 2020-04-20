# The Project

A mern stack with basic user auth and user login/registration system. Create react app front end in TS and ExpressJS server on the back end.

[A demo is hosted on Heroku here](https://frozen-ravine-16461.herokuapp.com/) 

## Getting Started

Make sure you have node installed:

```javascript
npm install
```

Config is in the config folder in the root directory. 

You will need to copy **prod.js** and rename to **dev.js** and add your keys.

If you don't add **mailUser** & pass information ensure **emailRegistration** is set to **false**.

To start:
```javascript
npm run dev
```

## The client

Create react app, not ejected.

####  TODO

- add docker / deploy to cloud
- add in testing

## The server

Some routes are protected and require authentication via http only cookie and some also require authorisation denoted by user role on the user object. 

There is also a *users* endpoint for fetching, updating, deleting a user or users, that are not listed here.
For *users* endpoints you need a user with a role of "admin" (create user via postman)

| verb | route | params |
|------|-------|--------|
| POST | /api/login | email: string, password: string |
| POST | /api/logout | Not required|
| POST | /api/signup | name: string, password: string, email: string |


####  TODO

- add docker / deploy to cloud
- explore SSR vs static with express js
- add ts to server
- add testing
