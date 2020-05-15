//only for use with docker-compose locally
admindDb = db.getSiblingDB('admin');
admindDb.auth('admin', 'adminPassword');

mernDb = admindDb.getSiblingDB('mern');

mernDb.createUser(
  {
    user: "defaultUser",
    pwd: "defaultPassword",
    roles: [
      {
        role: "readWrite",
        db: "mern"
      }
    ]
  }
)
