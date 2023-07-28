const express = require("express");
const app = express();
const cors = require("cors");

// const pool = require("/db.js");

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

// pool.query("SELECT NOW()", (err, result) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//   } else {
//     console.log("Connected to PostgreSQL database:", result.rows[0].now);
//   }
// });

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
