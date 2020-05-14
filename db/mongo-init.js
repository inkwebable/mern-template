db.auth('root', 'rootPassword');

db = db.getSiblingDB('mern');

db.createUser(
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
