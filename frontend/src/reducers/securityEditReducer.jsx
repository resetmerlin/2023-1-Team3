import {
  SECURITY_PASSWORD_REQUEST,
  SECURITY_PASSWORD_SUCCESS,
  SECURITY_PASSWORD_FAIL,
  SECURITY_UPLOAD_PROFILE_REQUEST,
  SECURITY_UPLOAD_PROFILE_SUCCESS,
  SECURITY_UPLOAD_PROFILE_FAIL,
} from "../constants/securityEditConstants";

/** 유저들 불러오기 reducers */
export const passwordEditReducers = (state = {}, action) => {
  switch (action.type) {
    case SECURITY_PASSWORD_REQUEST:
      return { loading: true, ...state };

    case SECURITY_PASSWORD_SUCCESS:
      return {
        loading: false,
        passwordEditStatus: action.payload,
      };

    case SECURITY_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

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
