import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_EMAIL_REQUEST,
  USER_EMAIL_SUCCESS,
  USER_EMAIL_FAIL,
} from "../constants/userConstants";
import axios from "axios";

//action creator
//Redux thunk
export const emailVerifyAction = (mail) => async (dispatch) => {
  try {
    console.log(mail);
    dispatch({ type: USER_EMAIL_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://138.2.127.153:8080/member/mail",
      JSON.stringify(mail),
      config
    );

    dispatch({ type: USER_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_EMAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messge,
    });
  }
};

export const registerAction = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    console.log(JSON.stringify(userInfo));

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://138.2.127.153:8080/member/signup",
      JSON.stringify(userInfo),

      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messge,
    });
  }
};

export const loginAction = (mail, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    console.log(mail, password);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://138.2.127.153:8080/member/signup",
      JSON.stringify(mail, password),

      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messge,
    });
  }
};