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
const reducer = combineReducers({
  emailInfo: sendEmailReducers,
  registerInfo: userRegisterReducers,
  codeInfo: codeVerificationReducers,
  saveInfo: saveUserReducers,
  loginInfo: userLoginReducers,
});
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
