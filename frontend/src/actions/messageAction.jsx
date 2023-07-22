//action creator
//Redux thunk

import {
  MESSAGE_INITIATE,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_FAIL,
  MESSAGE_LOG_SUCCESS,
  MESSAGE_LOG_FAIL,
  MESSAGE_LOG_REQUEST,
  MESSAGE_GET_HISTORY_SUCCESS,
  MESSAGE_GET_HISTORY_REQUEST,
  MESSAGE_GET_HISTORY_FAIL,
} from "../constants/messageConstants";

export const messageInitiateAction = (user) => async (dispatch) => {
  dispatch({ type: MESSAGE_INITIATE, payload: user });
};

/** 리스트 가졍 Action */
export const getMessagesHistoryAction =
  (messageResponse) => async (dispatch, getState) => {
    const {
      messageInfo: { messageFetchStatus },
    } = getState();
    try {
      dispatch({ type: MESSAGE_GET_HISTORY_REQUEST });

      const chatMessageResponse = JSON.parse(messageResponse.body);

      if (chatMessageResponse.status === "FETCH") {
        if (chatMessageResponse.count !== 0) {
          const data = [
            ...messageFetchStatus,
            ...chatMessageResponse?.chatMessages,
          ];

          dispatch({ type: MESSAGE_GET_HISTORY_SUCCESS, payload: data });
        }
      } else if (chatMessageResponse.status === "GET") {
        const data = [
          ...messageFetchStatus,
          ...chatMessageResponse?.chatUsers[0]?.chatMessages,
        ];
        dispatch({ type: MESSAGE_GET_HISTORY_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: MESSAGE_GET_HISTORY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.messge,
      });
    }
  };

/** 리스트 가졍 Action */
export const getMessageRelationAction =
  (response) => async (dispatch, getState) => {
    try {
      dispatch({ type: MESSAGE_LOG_REQUEST });

      const chatMessageResponse = JSON.parse(response.body);

      const data = chatMessageResponse?.chatUsers;

      dispatch({ type: MESSAGE_LOG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MESSAGE_LOG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.messge,
      });
    }
  };

/** 리스트 가졍 Action */
export const sendMessageAction = (response) => async (dispatch, getState) => {
  const {
    messageSendInfo: { messageSendStatus },
  } = getState();
  try {
    dispatch({ type: MESSAGE_SEND_REQUEST });

    if (response?.body) {
      const chatMessageResponse = JSON.parse(response.body);

      const data = [...messageSendStatus, ...chatMessageResponse?.chatMessages];

      dispatch({ type: MESSAGE_SEND_SUCCESS, payload: data });
    } else {
      const messageRequest = JSON.parse(response);

      const data = [...messageSendStatus, ...messageRequest];

      dispatch({ type: MESSAGE_SEND_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: MESSAGE_SEND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messge,
    });
  }
};