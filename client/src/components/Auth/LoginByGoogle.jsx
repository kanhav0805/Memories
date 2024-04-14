import React, { useState, useEffect } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../constants/actionTypes";
//now we need to dispath action of auth to store auth details of user

const LoginByGoogle = () => {
  const [user, setUser] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlLogin = useGoogleLogin({
    onSuccess: (GoogleResponse) => {
      setUser(GoogleResponse);
      console.log("-----GoogleResponse-----");
      console.log(GoogleResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log("---- UserProfile-------");
          console.log(res.data);
          //no we an dispatch the action to store auth details
          const result = res?.data;
          const token = user?.access_token;
          setUserProfile(res.data);
          dispatch({ type: AUTH, data: { result, token } });
          //now we need to navigate to the home page
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, user]);

  return (
    <div className="shadow-2xl">
      <button
        type="button"
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "0.2rem 1.5rem",
          borderRadius: "0.5rem",
          cursor: "pointer",
          outline: "none",
          display: "flex",
          fontSize: "0.9rem",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
        }}
        onClick={handlLogin}
      >
        {/* <FcGoogle style={{ marginRight: "14px" }} /> */}
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginByGoogle;
