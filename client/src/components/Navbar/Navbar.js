import React, { useEffect, useState } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import "./styles.css";
import memories from "../../images/memories.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  // const user = null;

  //now the use effect to set the state

  //logout function
  const logout = () => {
    //dispatch se state change
    dispatch({ type: LOGOUT });
    localStorage.clear();
    //set user null
    setUser(null);
  };

  console.log(user, "user");
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token]);

  console.log(user, "in navbar");
  return (
    <AppBar
      position="static"
      color="inherit"
      className="appBar"
      style={{ padding: "10px 30px" }}
    >
      <Toolbar
        // className="toolbar"
        style={{
          justifyContent: "space-between",
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <div className="brandContainer">
          <Typography
            component={Link}
            to="/"
            className="heading"
            variant="h5"
            align="center"
          >
            Memories
          </Typography>
          <img className="image" src={memories} alt="icon" height="60" />
        </div>
        {user ? (
          <div className="profile">
            <Avatar
              className="purple"
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className="userName" variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className="logout"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
