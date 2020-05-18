# The Server

Users ExpressJS.


## Getting Started

Make sure you have node installed:

```javascript
npm install
```

To start:
```javascript
npm run start
```

Some routes are protected and require authentication via http only cookie and some also require authorisation denoted by user role on the user object. 

There is also a *users* endpoint for fetching, updating, deleting a user or users, that are not listed here.
For *users* endpoints you need a user with a role of "admin" (create user via postman)

| verb | route | params |
|------|-------|--------|
| POST | /api/login | email: string, password: string |
| POST | /api/logout | Not required|
| POST | /api/signup | name: string, password: string, email: string |

