import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_EMAIL_REQUEST,
  USER_EMAIL_SUCCESS,
  USER_EMAIL_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
} from "../constants/userConstants";
/** 이메일 인증코드 전송 reducers */
export const sendEmailReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_EMAIL_REQUEST:
      return { loading: true, ...state };

    case USER_EMAIL_SUCCESS:
      return {
        loading: false,
        emailStatus: action.payload,
      };

    case USER_EMAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const codeVerificationReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true, ...state };

    case USER_VERIFY_SUCCESS:
      return {
        loading: false,
        codeStatus: action.payload,
      };

    case USER_VERIFY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userRegisterReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, ...state };

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        registerStatus: action.payload,
      };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, ...state };

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        loginInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
