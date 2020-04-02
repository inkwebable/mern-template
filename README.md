# The client

To get started:

```javascript
cd client
npm run start
```

####  TODO

- add docker / deploy to cloud
- add some testing
- error handling from API
- add real header & nav
- add user profile page
- re-vist authorisation & storing of user data

# The server
To get started:

- copy .env.example & rename to .env
- add your mongo account details 

```javascript
npm run dev
```

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
- figure the refresh token
- add testing