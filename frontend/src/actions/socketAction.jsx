//action creator
//Redux thunk

import {
  SOCKET_DISCONNECT,
  SOCKET_RELATION,
  SOCKET_CONNECT,
  SOCKET_SEND,
  SOCKET_GET,
  SOCKET_FETCH,
} from "../constants/messageConstants";

export const socketConnectAction = () => async (dispatch) => {
  const socket = new SockJS(`${import.meta.env.VITE_API_URL}/chat`);

  dispatch({
    type: SOCKET_CONNECT,
    payload: socket,
  });
};

export const socketSendAction = (message) => async (dispatch) => {
  dispatch({ type: SOCKET_SEND, payload: message });
};

export const socketRelationAction = () => async (dispatch) => {
  dispatch({ type: SOCKET_RELATION });
};

export const socketFetchMessagesAction = () => async (dispatch) => {
  dispatch({ type: SOCKET_FETCH });
};

export const socketGetMessagesAction = () => async (dispatch) => {
  dispatch({ type: SOCKET_GET });
};

export const socketDisconnectAction = () => async (dispatch) => {
  dispatch({ type: SOCKET_DISCONNECT });
};
