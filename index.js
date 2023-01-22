const express = require("express");

// import routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

const port = 8081;

app.use(express.json());

// npm i nodemon --save-dev
// const data = ["yashwant", "dev"];

app.get("/", (req, res) => {
  res.status(200).json({
    // send is used when we have to send string response but if we want to send more than one response then we use json
    message: "Server is up and running successfully",
  });
});

// http://localhost:8081/users/
app.use("/users", usersRouter);
app.use("/books", booksRouter);



app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exist",
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
