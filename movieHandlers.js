const database = require("./database");

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

// version 1
// const getMovies = (req, res) => {

//   let sql="select * from movies";
//   const sqlValues=[];

//     if(req.query.color!==Null){
//       sql+="where color=?";
//       sqlValues.push(req.query.color);
    

//       if(req.query.max_duration!=Null){
//         sql+="and duration<=?";
//         sqlValues.push(req.query.max_duration);
//       }
//   }else if(req.query.max_duration!=Null){
//     sql+="where duration<=?";
//     sqlValues.push(req.query.max_duration);
//   }


//   database
//     .query(sql,sqlValues)
//     .then(([movies]) => {
//       res.json(movies);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving data from database");
//     });
// };

// version 2
const getMovies = (req, res) => {
  const initialSql = "select * from movies";
  const where = [];

  if (req.query.color != null) {
    where.push({
      column: "color",
      value: req.query.color,
      operator: "=",
    });
  }
  if (req.query.max_duration != null) {
    where.push({
      column: "duration",
      value: req.query.max_duration,
      operator: "<=",
    });
  }

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
    .then(([movies]) => {
      res.json(movies);
      res.status(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postMovie=(req,res)=>{
  const{title,director,year,color,duration}=req.body;

  database
    .query(
      "INSERT INTO movies(title,director,year,color,duration) VALUES (?,?,?,?,?)",
      [title,director,year,color,duration]
    )
    .then(([result])=>{
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};



const updateMovie=(req,res)=>{
  const id = parseInt(req.params.id);
  const{title,director,year,color,duration}=req.body;

  database
    .query(
      "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title,director,year,color,duration,id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};



const delateMovie=(req,res)=>{
  const id = parseInt(req.params.id);

  database
    .query(
      "delete from movies where id = ?",[id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error delating the movie");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  delateMovie,
};
