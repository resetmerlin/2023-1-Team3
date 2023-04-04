import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_EMAIL_REQUEST,
  USER_EMAIL_SUCCESS,
  USER_EMAIL_FAIL,
} from "../constants/userConstants";
import axios from "axios";

//action creator
//Redux thunk
export const emailVerifyAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_EMAIL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://138.2.127.153:8080/member/mail",
      { email },
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
    console.log(userInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://138.2.127.153:8080/member/signup",
      { userInfo },
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
