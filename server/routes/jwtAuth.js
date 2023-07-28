const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//authorizeentication

// router.post("/register", validInfo, async (req, res) => {

router.post("/register", async (req, res) => {
  pool.query("SELECT NOW()", (err, result) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to PostgreSQL database:", result.rows[0].now);
    }
  });
  const { name, email, password, dob, gender } = req.body;
  console.log(req.body);

  // pool.query("SELECT * FROM users", (error, results, fields) => {
  //   if (error) throw error;
  //   console.log("The solution is: ", results[0].solution);
  // });

  // try {
  const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
    email,
  ]);

  res.json(user.rows);

  // if (user.rows.length > 0) {
  //   return res.status(401).json("User already exist!");
  // }
  // const salt = await bcrypt.genSalt(10);
  // const bcryptPassword = await bcrypt.hash(password, salt);
  // let newUser = await pool.query(
  //   "INSERT INTO users (user_name, user_dob, user_gender,user_email, user_password) VALUES ($1, $2, $3,$4,$5) RETURNING *",
  //   [name, dob,gender, email, bcryptPassword]
  // );
  // const jwtToken = jwtGenerator(newUser.rows[0].user_id);
  // return res.json({ jwtToken });
  // } catch (err) {
  // console.error(err.message);
  // res.status(500).send("Server error");
  // }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
