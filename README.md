# The client

```javascript
cd client
npm run start
```


# The server

```javascript
cd server
npm run dev
```

The server runs on express. Some routes are protected and require authentication via http only cookie and some require authorisation denoted by user role. 

| verb | route | params |
|------|-------|--------|
| POST | /api/login | email: string, password: string |
| POST | /api/logout | Not required|
| POST | /api/signup | name: string, password: string, email: string |


