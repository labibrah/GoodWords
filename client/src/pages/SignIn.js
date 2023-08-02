// SignUp.js
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { gql, useQuery, useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom"; //
import { Grid, Avatar, Paper } from "@mui/material";

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

const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
    }
  }
`;
const SignIn = () => {
  const client = useApolloClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { signIn, loading, error } = useQuery(SIGN_IN);
  const { loading, error, data, refetch } = useQuery(LOGIN_USER, {
    variables: { email: "", password: "" },
    skip: true,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle sign-up logic here (e.g., send form data to the server)
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    let formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const { data } = await refetch({
        email: formData.email,
        password: formData.password,
      });
      console.log("User logged in successfully:", data.loginUser);
      // console.log("Sign-in successful!", token);
      // Perform the redirect here (e.g., using React Router)
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in failed:", error.message);
    }
  };
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  const paperStyle = {
    padding: 40,
    height: "35vh",
    width: "25vh",
    margin: "60px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h5">Sign In</Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />
          <br></br>
          <br></br>

          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            name="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <br></br>
          <br></br>

          <Button
            color="secondary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            style={btnstyle}
            onSubmit={handleSubmit}
          >
            LOGIN
          </Button>
          {error && <p>Error: {error.message}</p>}
        </form>
        <Typography>
          Don't have an account? <Link to="/signup"> Sign Up </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignIn;
