//now we will create a reducer for authenticanion
import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      //now we will store it in local storage
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
