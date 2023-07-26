import {
  getMessageRelationAction,
  getMessagesHistoryAction,
  sendMessageAction,
} from "../actions/messageAction";
import { useDispatch, useSelector } from "react-redux";

export class WebSocket {
  constructor() {
    this.socket = null;
    this.memberId = null;
    this.opponentMemberId = null;
    this.dispatch = useDispatch();
  }

  setEnvironment(memberId, opponentMemberId) {
    this.memberId = memberId;
    this.opponentMemberId = opponentMemberId;
  }
  initiate(url) {
    if (!this.socket) {
      const socket = new SockJS(url);
      this.socket = Stomp.over(socket);
    }
  }

  /** CONNECT: 서버와 통신 시작 */
  connect() {
    if (this.socket) {
      this.socket.connect({}, () => {
        /** SUBSCRIBE: 내 메세지 direction 접속 */
        this.socket.subscribe(
          `/topic/${this.memberId}`,
          (response) => {
            if (response?.body) {
              const body = JSON.parse(response?.body);

              if (body?.status == "FETCH" || "GET") {
                this.dispatch(getMessagesHistoryAction(response));

                console.log(response);
              } else if (body?.status == "OK" || "SEND") {
                this.dispatch(sendMessageAction(response));
              }
            } else {
              this.dispatch(sendMessageAction(response));
            }
          },
          { memberId: this.memberId }
        );
      });
    }
  }

  getRelation(time) {
    if (this.socket) {
      this.socket.send(
        "/app/log",
        {},
        JSON.stringify({
          memberId: this.memberId,
          timeStamp: time,
        })
      );
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /** SEND/FETCH: 내가 접속하지 않을때 상대가 보낸 메세지들을 가져옴 */
  getNotSeenMsg(time) {
    if (this.socket) {
      this.socket.send(
        "/app/fetch",
        {},
        JSON.stringify({
          memberId: this.memberId,
          timeStamp: time,
        })
      );
    }
  }

  /** SEND/GET: 이전의 기록들을 가져옴 */
  getMsgHistory(time) {
    if (this.socket) {
      this.socket.send(
        "/app/get",
        {},
        JSON.stringify({
          fromMemberId: this.memberId,
          toMemberId: this.opponentMemberId,
          page: 0,
          timeStamp: time,
        })
      );
    }
  }

  /** SEND: 메세지를 전송함 */
  send(time, messages) {
    if (this.socket) {
      const request = {
        sendMemberId: this.memberId,
        recvMemberId: this.opponentMemberId,
        timeStamp: time,
        message: messages,
      };
      this.dispatch(sendMessageAction(JSON.stringify([request])));
      this.socket.send("/app/send", {}, JSON.stringify(request));
    }
  }
}
