import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducers,
  sendEmailReducers,
  userLoginReducers,
  codeVerificationReducers,
} from "./reducers/userReducer";
import { saveUserReducers } from "./reducers/buttonReducer";
import { peopleListReducers } from "./reducers/peopleReducer";
import { passwordEditReducers } from "./reducers/securityEditReducer";
const reducer = combineReducers({
  emailInfo: sendEmailReducers,
  registerInfo: userRegisterReducers,
  codeInfo: codeVerificationReducers,
  saveInfo: saveUserReducers,
  loginInfo: userLoginReducers,
  peopleListInfo: peopleListReducers,
  passwordEditInfo: passwordEditReducers,
});

const tokenFromStorage = sessionStorage.getItem("sessfbs_ffa0934")
  ? JSON.parse(sessionStorage.getItem("sessfbs_ffa0934"))
  : null;

// const userListFromStorage = localStorage.getItem("peopleListStatus")
//   ? JSON.parse(localStorage.getItem("peopleListStatus"))
//   : null;

const initialState = {
  loginInfo: {
    sessfbs_ffa0934: tokenFromStorage,
  },
  // peopleListInfo: {
  //   peopleListStatus: userListFromStorage,
  // },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
