require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};



app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers=require("./userHandlers");
const { validateMovie } = require("./validators.js");
const { validateUser } = require("./validators.js");
const { hashPassword } = require("./auth.js");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies",  validateMovie,movieHandlers.postMovie);
app.put("/api/movies/:id",validateMovie,movieHandlers.updateMovie);
app.delete("/api/movies/:id",movieHandlers.delateMovie);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
app.post("/api/users", hashPassword, validateUser, userHandlers.postUser);
app.put("/api/users/:id", hashPassword, validateUser, userHandlers.updateUser);
app.delete("/api/users/:id",userHandlers.delateUser);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
