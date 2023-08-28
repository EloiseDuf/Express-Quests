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
const users=require("./users");
const { validateMovie } = require("./validators.js");
const { validateUser } = require("./validators.js");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies",  validateMovie,movieHandlers.postMovie);
app.put("/api/movies/:id",validateMovie,movieHandlers.updateMovie);
app.delete("/api/movies/:id",movieHandlers.delateMovie);
app.get("/api/users", users.getUsers);
app.get("/api/users/:id", users.getUsersById);
app.post("/api/users",validateUser, movieHandlers.postUser);
app.put("/api/users/:id",validateUser, movieHandlers.updateUser);
app.delete("/api/users/:id",movieHandlers.delateUser);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
