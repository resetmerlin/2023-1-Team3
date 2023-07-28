import {
  SOCKET_SUCCESS,
  SOCKET_SUBSCRIBE,
  SOCKET_DISCONNECT,
  SOCKET_RELATION,
  SOCKET_FAIL,
  SOCKET_REQUEST,
  SOCKET_CONNECT,
} from "../constants/messageConstants";

export const socketReducers = (state = {}, action) => {
  switch (action.type) {
    case SOCKET_REQUEST:
      return { loading: true, ...state };
    case SOCKET_SUCCESS:
      return {
        loading: false,
        socketStatus: action.payload,
      };
    case SOCKET_FAIL:
      return { loading: false, error: action.payload };

    case SOCKET_CONNECT:
      return { loading: false };
    default:
      return state;
  }
};
