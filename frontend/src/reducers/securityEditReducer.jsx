import {
  SECURITY_PASSWORD_REQUEST,
  SECURITY_PASSWORD_SUCCESS,
  SECURITY_PASSWORD_FAIL,
  SECURITY_UPLOAD_PROFILE_REQUEST,
  SECURITY_UPLOAD_PROFILE_SUCCESS,
  SECURITY_PASSWORD_RESET,
  SECURITY_UPLOAD_PROFILE_FAIL,
  SECURITY_PERSONALINFO_REQUEST,
  SECURITY_PERSONALINFO_SUCCESS,
  SECURITY_PERSONALINFO_FAIL,
  SECURITY_GET_PERSONALINFO_REQUEST,
  SECURITY_GET_PERSONALINFO_SUCCESS,
  SECURITY_GET_PERSONALINFO_FAIL,
  SECURITY_GET_PERSONALINFO_RESET,
  SECURITY_PERSONALINFO_RESET,
} from "../constants/securityEditConstants";

/** 유저들 불러오기 reducers */
export const passwordEditReducers = (state = {}, action) => {
  switch (action.type) {
    case SECURITY_PASSWORD_REQUEST:
      return { loading: true, ...state, passwordEditStatus: false };

    case SECURITY_PASSWORD_SUCCESS:
      return {
        loading: false,
        passwordEditStatus: true,
      };

    case SECURITY_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    case SECURITY_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

/** 유저들 불러오기 reducers */
export const profileEditReducers = (state = {}, action) => {
  switch (action.type) {
    case SECURITY_UPLOAD_PROFILE_REQUEST:
      return { loading: true, ...state };

    case SECURITY_UPLOAD_PROFILE_SUCCESS:
      return {
        loading: false,
        profileEditStatus: action.payload,
      };

    case SECURITY_UPLOAD_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

/** 유저들 불러오기 reducers */
export const personalInfoEditReducers = (state = {}, action) => {
  switch (action.type) {
    case SECURITY_PERSONALINFO_REQUEST:
      return { loading: true, ...state, personalInfoEditStatus: false };

    case SECURITY_PERSONALINFO_SUCCESS:
      return {
        loading: false,
        personalInfoEditStatus: action.payload,
      };

    case SECURITY_PERSONALINFO_FAIL:
      return { loading: false, error: action.payload };
    case SECURITY_PERSONALINFO_RESET:
      return {};
    default:
      return state;
  }
};

/** 유저들 불러오기 reducers */
export const getPersonalInfoReducers = (state = {}, action) => {
  switch (action.type) {
    case SECURITY_GET_PERSONALINFO_REQUEST:
      return { loading: true, ...state, personalInfoStatus: false };

    case SECURITY_GET_PERSONALINFO_SUCCESS:
      return {
        loading: false,
        personalInfoStatus: action.payload,
      };

    case SECURITY_GET_PERSONALINFO_FAIL:
      return { loading: false, error: action.payload };

    case SECURITY_GET_PERSONALINFO_RESET:
      return {};

    default:
      return state;
  }
};
