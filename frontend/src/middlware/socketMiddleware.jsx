import {
  SOCKET_DISCONNECT,
  SOCKET_RELATION,
  SOCKET_CONNECT,
  SOCKET_SEND,
  SOCKET_GET,
  SOCKET_FETCH,
} from "../constants/messageConstants";
import { giveCurrentTime } from "../func/commonLogicHelper";
import { WebSocket } from "../hooks/WebSocket";

export const socketMiddleware = () => (params) => (next) => (action) => {
  const { dispatch, getState } = params;

  const {
    personalInfo: { personalInfoStatus },
    messageRelationInfo: { userMessageInfo },
  } = getState();

  const { memberId: myMemberId } = personalInfoStatus;
  const { memberId: opponentMemberId } = userMessageInfo;

  const client = new WebSocket();
  client.setEnvironment(myMemberId, opponentMemberId, dispatch);

  switch (action.type) {
    case SOCKET_CONNECT:
      client.initiate(`${import.meta.env.VITE_API_URL}/chat`);

      break;

    case SOCKET_RELATION:
      client.connect();
      break;

    case SOCKET_SEND:
      client.send(giveCurrentTime(), action.payload);

      break;

    case SOCKET_FETCH:
      client.getNotSeenMsg(giveCurrentTime());

      break;
    case SOCKET_GET:
      client.getMsgHistory(giveCurrentTime());

      break;
    case SOCKET_DISCONNECT:
      client.disconnect();

      break;
    default:
      return next(action);
  }
};
