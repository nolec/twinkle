import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import jwtDecode from "jwt-decode";
import * as Types from "../store/actions/types";
import setAuthToken from "../utils/setAuthToken";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
const token = sessionStorage.getItem("auth_token");
if (token) {
  let decode = jwtDecode(token);
  // setAuthToken(token);
  store.dispatch({
    type: Types.SET_USER,
    payload: {
      user: decode
    }
  });
}
export default store;
