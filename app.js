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

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies",movieHandlers.postMovie);
app.put("/api/movies/:id",movieHandlers.updateMovie);
app.get("/api/users", users.getUsers);
app.get("/api/users/:id", users.getUsersById);
app.post("/api/users",movieHandlers.postUser);
app.put("/api/users/:id",movieHandlers.updateUser);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
