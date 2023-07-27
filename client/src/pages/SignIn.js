// SignUp.js
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Grid, Avatar, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here (e.g., send form data to the server)
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>{/* <LockOutlinedIcon /> */}</Avatar>
          <Typography variant="h5">Sign In</Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <br></br>
          <br></br>

          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <br></br>
          <br></br>

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            style={btnstyle}
            onSubmit={handleSubmit}
          >
            LOGIN
          </Button>
        </form>
        <Typography>
          Don't have an account? <Link to="/signup"> Sign Up </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignIn;
