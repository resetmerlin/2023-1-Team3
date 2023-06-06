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
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";
import axios from "axios";

//action creator
//Redux thunk

/** 이메일에 인증코드 전송 Action */
export const sendEmailCodeAction = (mail) => async (dispatch) => {
  try {
    dispatch({ type: USER_EMAIL_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/member/mail`,
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
/** 인증코드 확인 Action*/
export const codeVerificationAction = (mail, code) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/member/code`,

      JSON.stringify(mail, code),
      config
    );

    dispatch({ type: USER_VERIFY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messge,
    });
  }
};
/** 회원가입 Action */
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
      `${import.meta.env.VITE_API_URL}/member/signup`,

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

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/member/signin`,

      JSON.stringify(mail, password),

      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    sessionStorage.setItem("sessfbs_ffa0934", JSON.stringify(data));
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

export const logoutAction = () => (dispatch) => {
  sessionStorage.removeItem("sessfbs_ffa0934");

  dispatch({ type: USER_LOGOUT });
};
