import axios from "axios";
import jwtDecode from "jwt-decode";
import * as Types from "./types";
import setAuthToken from "../../utils/setAuthToken";

export const register = (user, history) => dispatch => {
  axios
    .post("/api/users/register", user)
    .then(res => {
      dispatch({
        type: Types.USERS_ERROR,
        payload: {
          error: {}
        }
      });
      console.log(res);
      history.push("/login");
    })
    .catch(error => {
      dispatch({
        type: Types.USERS_ERROR,
        payload: {
          error: error.response.data
        }
      });
    });
};

export const login = (user, history) => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      let token = res.data.token;
      sessionStorage.setItem("auth_token", token);
      // setAuthToken(token);
      let decode = jwtDecode(token);

      dispatch({
        type: Types.SET_USER,
        payload: {
          user: decode
        }
      });
      history.push("/");
    })
    .catch(error => {
      dispatch({
        type: Types.USERS_ERROR,
        payload: {
          error: error.response.data
        }
      });
    });
};

export const logout = history => {
  sessionStorage.removeItem("auth_token");
  history.push("/");
  return {
    type: Types.SET_USER,
    payload: {
      user: {}
    }
  };
};
