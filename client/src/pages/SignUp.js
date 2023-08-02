import React, { useState, Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { InputAdornment, IconButton, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, Autocomplete, Paper } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom"; //

import * as Yup from "yup";

const SIGN_UP_USER = gql`
  mutation SignUpUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $gender: String!
    $dateOfBirth: String!
  ) {
    signUpUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      gender: $gender
      dateOfBirth: $dateOfBirth
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const genderOptions = ["Male", "Female", "Other"];
  const [signUpUser, { data }] = useMutation(SIGN_UP_USER);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
    dob: Yup.string().required("Last name is required"),
    gender: Yup.string().required("Last name is required"),
    confirmPassword: Yup.string().required("Password confirmation is required"),
  });
  const handleGenderChange = (event, value) => {
    setGender(value);
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordError("");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const paperStyle = {
    padding: 40,
    height: "45vh",
    width: "30vh",
    margin: "60px auto",
  };

  const btnstyle = { margin: "8px 0" };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit form data to the server here
    let formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      gender: gender,
      dateOfBirth: dob,
    };
    // You can access all form values from the component state (firstName, lastName, dob, gender, email, password)
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      // const error = apolloError
      // console.log(JSON.stringify(error, null, 2));
      // console.log(error instanceof Error);
      console.log("Form data submitted:", formData);
      await signUpUser({ variables: { ...formData } });
      navigate("/dashboard");

      console.log("Form data submitted:", formData);
    }
  };
  const formik = useFormik({
    // initialValues: {
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   password: '',
    //   confirmPassword:'',
    //   gender:'',

    //   dob: '',
    // },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      // Perform the data submission to the server here
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match.");
      } else {
        console.log("Form data submitted:", values);
      }

      // Call your API to send data to the server
    },
  });

  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Typography variant="h5">SIGN UP</Typography>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <br></br>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                name="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <br></br>
              <br></br>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                name="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <Button
                color="secondary"
                variant="contained"
                fullWidth
                type="button"
                style={btnstyle}
                onClick={handleNext}
              >
                NEXT
              </Button>
            </div>
          )}
          {step === 2 && (
            <div>
              <br></br>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                name="dob"
                label="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
              <br></br>
              <br></br>
              {/* displays 0 needs fix */}
              <Autocomplete
                id="gender-autocomplete"
                options={genderOptions}
                value={gender}
                onChange={handleGenderChange}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Gender" variant="outlined" />
                )}
              />

              {/* <label>Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select> */}
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                type="button"
                style={btnstyle}
                onClick={handlePrev}
              >
                BACK
              </Button>
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                type="button"
                style={btnstyle}
                onClick={handleNext}
              >
                NEXT
              </Button>
            </div>
          )}
          {step === 3 && (
            <div>
              <br></br>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                name="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br></br>
              <br></br>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br></br>
              <br></br>
              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                error={Boolean(passwordError)}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                type="button"
                style={btnstyle}
                onClick={handlePrev}
              >
                BACK
              </Button>
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                type="submit"
                style={btnstyle}
              >
                SIGN UP
              </Button>
            </div>
          )}
          <Typography>
            Already have an account? <Link to="/"> Sign in </Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;
