//we will create auth actions in this
import * as api from "../api/index.js";
import { AUTH } from "../constants/actionTypes.js";
export const signIn = (form, navigate) => async (dispatch) => {
  try {
    //we will call the sign in end point and navigate to the home page
    const { data } = await api.signIn(form);
    //now we will dispatch the action
    dispatch({ type: AUTH, data });
    //navigate to the home page
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (form, navigate) => async (dispatch) => {
  try {
    //we will call the sign in end point and navigate to the home page
    const { data } = await api.signUp(form);
    //now we will dispatch the action
    dispatch({ type: AUTH, data });
    //navigate to the home page
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
