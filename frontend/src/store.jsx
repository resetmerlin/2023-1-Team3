import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducers,
  sendEmailReducers,
  userLoginReducers,
  codeVerificationReducers,
} from "./reducers/userReducer";
import { saveUserReducers, blockUserReducers } from "./reducers/buttonReducer";
import { peopleListReducers } from "./reducers/peopleReducer";
import {
  passwordEditReducers,
  profileEditReducers,
} from "./reducers/securityEditReducer";
import { getSaveListReducers } from "./reducers/saveReducer";
import { deleteSaveReducers } from "./reducers/saveReducer";
const reducer = combineReducers({
  emailInfo: sendEmailReducers,
  registerInfo: userRegisterReducers,
  codeInfo: codeVerificationReducers,
  saveInfo: saveUserReducers,
  blockInfo: blockUserReducers,
  loginInfo: userLoginReducers,
  peopleListInfo: peopleListReducers,
  passwordEditInfo: passwordEditReducers,
  saveListInfo: getSaveListReducers,
  profileEditInfo: profileEditReducers,
  deleteSaveInfo: deleteSaveReducers,
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
