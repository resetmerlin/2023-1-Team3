import {
  SECURITY_PASSWORD_REQUEST,
  SECURITY_PASSWORD_SUCCESS,
  SECURITY_PASSWORD_FAIL,
  SECURITY_UPLOAD_PROFILE_REQUEST,
  SECURITY_UPLOAD_PROFILE_SUCCESS,
  SECURITY_UPLOAD_PROFILE_FAIL,
  SECURITY_PERSONALINFO_REQUEST,
  SECURITY_PERSONALINFO_SUCCESS,
  SECURITY_PERSONALINFO_FAIL,
  SECURITY_GET_PERSONALINFO_REQUEST,
  SECURITY_GET_PERSONALINFO_SUCCESS,
  SECURITY_GET_PERSONALINFO_FAIL,
} from "../constants/securityEditConstants";
import axios from "axios";

/** 회원가입 Action */
export const passwordEditAction =
  (passwordEditValue) => async (dispatch, getState) => {
    try {
      dispatch({ type: SECURITY_PASSWORD_REQUEST });
      const {
        loginInfo: { sessfbs_ffa0934 },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessfbs_ffa0934.accessToken}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/member/reset`,
        passwordEditValue,
        config
      );

      dispatch({ type: SECURITY_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SECURITY_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.messge,
      });
    }
  };

export const profileEditAction = (image) => async (dispatch, getState) => {
  try {
    dispatch({ type: SECURITY_UPLOAD_PROFILE_REQUEST });
    const {
      loginInfo: { sessfbs_ffa0934 },
    } = getState();

    const formData = new FormData();

    formData.append("image", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessfbs_ffa0934.accessToken}`,
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/member/images`,
      formData,

      config
    );

    dispatch({ type: SECURITY_UPLOAD_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SECURITY_UPLOAD_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messge,
    });
  }
};

export const personalInfoEditAction =
  (personalInfo) => async (dispatch, getState) => {
    try {
      dispatch({ type: SECURITY_PERSONALINFO_REQUEST });
      const {
        loginInfo: { sessfbs_ffa0934 },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessfbs_ffa0934.accessToken}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/member/mypages`,
        personalInfo,
        config
      );

      dispatch({ type: SECURITY_PERSONALINFO_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SECURITY_PERSONALINFO_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.messge,
      });
    }
  };

export const getPersonalInfoAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SECURITY_GET_PERSONALINFO_REQUEST });
    const {
      loginInfo: { sessfbs_ffa0934 },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessfbs_ffa0934.accessToken}`,
      },
    };

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/member/mypages`,
      config
    );

    dispatch({ type: SECURITY_GET_PERSONALINFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SECURITY_GET_PERSONALINFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messge,
    });
  }
};
