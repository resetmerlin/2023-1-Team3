import {
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_FAIL,
  MESSAGE_INITIATE,
  MESSAGE_LOG_SUCCESS,
  MESSAGE_LOG_FAIL,
  MESSAGE_LOG_REQUEST,
  MESSAGE_GET_HISTORY_SUCCESS,
  MESSAGE_GET_HISTORY_REQUEST,
  MESSAGE_GET_HISTORY_FAIL,
  MESSAGE_GET_HISTORY_RESET,
} from "../constants/messageConstants";

export const messageHistoryReducers = (
  state = { messageFetchStatus: { user: { messages: [] } } },

  action
) => {
  switch (action.type) {
    case MESSAGE_GET_HISTORY_REQUEST:
      return { loading: true, ...state };

    case MESSAGE_GET_HISTORY_SUCCESS:
      return {
        loading: false,
        messageFetchStatus: {
          page: action.payload.user.page,
          endPageSignal: action.payload.user.endPageSignal,
          user: {
            recvMemberId: action.payload.user.recvMemberId,
            messages: action.payload.user.messages,
          },
        },
      };

    case MESSAGE_GET_HISTORY_FAIL:
      return { loading: false, error: action.payload };

    case MESSAGE_GET_HISTORY_RESET:
      return { loading: false, messageFetchStatus: { user: { messages: [] } } };
    default:
      return state;
  }
};

export const messageInitiateReducers = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_INITIATE:
      return { userMessageStatus: action.payload };

    default:
      return state;
  }
};

export const messageRelationReducers = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_LOG_REQUEST:
      return { loading: true, ...state };
    case MESSAGE_LOG_SUCCESS:
      return {
        loading: false,
        messageUserStatus: action.payload,
      };
    case MESSAGE_LOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const messageSendReducers = (
  state = { messageSendStatus: [] },
  action
) => {
  switch (action.type) {
    case MESSAGE_SEND_REQUEST:
      return { loading: true, ...state };
    case MESSAGE_SEND_SUCCESS:
      return {
        loading: false,

        messageSendStatus: [
          ...state.messageSendStatus,
          ...action.payload.message,
        ],
      };
    case MESSAGE_SEND_FAIL:
      return { loading: false, error: action.payload };

    case MESSAGE_GET_HISTORY_RESET:
      return { loading: false, messageSendStatus: [] };
    default:
      return state;
  }
};
