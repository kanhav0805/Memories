import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { signin, signup } from "../../actions/auth";
import Input from "./Input";
import "./styles.css";
import LoginByGoogle from "./LoginByGoogle";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //now here we will check we clicked sign up button or sign in button
    if (!isSignup) {
      //sign in
      dispatch(signIn(form, navigate));
    } else {
      //sugn up
      dispatch(signUp(form, navigate));
    }
    console.log(form);
  };

  const handleChange = (e) => {
    //now we need to change the state
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className="paper" elevation={3}>
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  autocomplete="off"
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  autocomplete="off"
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              autocomplete="off"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              autocomplete="off"
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
                autocomplete="off"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            //we need to add onclick functionality
            onClick={handleSubmit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="googleButton"
          >
            <LoginByGoogle />
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
