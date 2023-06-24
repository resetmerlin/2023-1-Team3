//action creator
//Redux thunk

import {
  MESSAGE_GET_REQUEST,
  MESSAGE_GET_SUCCESS,
  MESSAGE_GET_FAIL,
} from "../constants/messageConstants";

/** 리스트 가졍 Action */
export const getMessageHistoryAction =
  (messageResponse) => async (dispatch, getState) => {
    try {
      dispatch({ type: MESSAGE_GET_REQUEST });

      const chatMessageResponse = JSON.parse(messageResponse.body);

      if (chatMessageResponse.status === "SEND") {
        data = chatMessageResponse;
      } else if (chatMessageResponse.status === "FETCH") {
        if (chatMessageResponse.count !== 0) {
          data = chatMessageResponse;
        }
      } else {
        // "RE-FETCH"
        data = chatMessageResponse;
      }

      dispatch({ type: MESSAGE_GET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MESSAGE_GET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.messge,
      });
    }
  };
