import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { getMessageRelationAction } from "../actions/messageAction";

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
  initiate() {
    if (!this.socket) {
      const client = useRef();

      const socket = new SockJS(`${import.meta.env.VITE_API_URL}/chat`);
      client.current = Stomp.over(socket);

      this.socket = client.current;
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

  /** CONNECT: 서버와 통신 시작 */
  connect() {
    if (this.socket) {
      this.socket.connect({}, () => {
        /** SUBSCRIBE: 내 메세지 direction 접속 */
        this.socket.subscribe(
          `/topic/${this.memberId}`,
          (response) => {
            this.dispatch(getMessageRelationAction(response));
          },
          { memberId: this.memberId }
        );
      });
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
      this.dispatch(getMessageRelationAction(JSON.stringify([request])));
      this.socket.send("/app/send", {}, JSON.stringify(request));
    }
  }
}
