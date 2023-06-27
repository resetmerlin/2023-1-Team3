import {
  MESSAGE_GET_REQUEST,
  MESSAGE_FETCH_GET_SUCCESS,
  MESSAGE_SEND_GET_SUCCESS,
  MESSAGE_GET_FAIL,
} from "../constants/messageConstants";

export const messageReducers = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_GET_REQUEST:
      return { loading: true, ...state };

    case MESSAGE_FETCH_GET_SUCCESS:
      return {
        loading: false,
        messageFetchStatus: action.payload,
      };
    case MESSAGE_SEND_GET_SUCCESS:
      return {
        loading: false,
        messageSendStatus: action.payload,
      };

    case MESSAGE_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
