# The Porject

A mern stack with basic user auth and user login/registration system. Create react app front end in TS and ExpressJS server on the back end.

[A demo is hosted on Heroku here](https://frozen-ravine-16461.herokuapp.com/) 

## Getting Started

Make sure you have node installed:

```javascript
npm install
```

Config is held in the config folder in the root, notice the **dev** & **prod** keys.
 
If you don't change the mongoUrl, you will connect to a test environment @ mongodb.net
(this will be removed in future releases)

To start:
```javascript
npm run dev
```

## The client

Create react app, not ejected.

####  TODO

- add docker / deploy to cloud
- add in testing
- error handling from API on all pages
- add a real header & nav
- add user registration page
- add user profile page
- re-vist authorisation & storing of user data

## The server

The server runs on express. Some routes are protected and require authentication via http only cookie and some require authorisation denoted by user role. 
There are also some user(s) endpoints for fetching, updating and deleting a user or users which are not listed here.
For users endpoints you need to set role to "admin" when posting to user signup (must be hardcoded)

| verb | route | params |
|------|-------|--------|
| POST | /api/login | email: string, password: string |
| POST | /api/logout | Not required|
| POST | /api/signup | name: string, password: string, email: string |


####  TODO

- add docker / deploy to cloud
- explore SSR vs static with express js
- add ts to server
- consider implementing module pattern structure
- add better error handling
- revistit refresh tokens
- add testing