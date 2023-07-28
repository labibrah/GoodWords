const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123",
  port: 5432,
  database: "goodwords",
});
// pool.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
module.exports = pool;
