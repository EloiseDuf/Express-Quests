const argon2 = require("argon2");

const hashPassword = (req, res, next) => {
  // hash the password using argon2 then call next()
};

module.exports = {
  hashPassword,
};

// in app.js

const { hashPassword } = require("./auth.js");

app.post("/api/users", hashPassword, userHandlers.postUser);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);