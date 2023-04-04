import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducers,
  emailVerifiyReducers,
  userLoginReducers,
} from "./reducers/userReducer";
const reducer = combineReducers({
  codeStatus: emailVerifiyReducers,
  userInfo: userRegisterReducers,
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
