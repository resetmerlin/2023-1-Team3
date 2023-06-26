import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ConversatonHeaderView from "./header/ConversatonHeaderView";
import ConversationContent from "./content/ConversationContent";
import ConversationBottom from "./bottom/ConversationBottom";
import { useParams, useLocation } from "react-router-dom";
import { Client } from "@stomp/stompjs";

import SockJS from "sockjs-client";

import { useDispatch, useSelector } from "react-redux";
import { getPersonalInfoAction } from "../../actions/securityEditAction";
import { getMessageHistoryAction } from "../../actions/messageAction";
import { authToken } from "../../hooks/MemoizedRedux";

const ConversationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().search;

  // 메세지 보낼 상대의 memberId를 params에 가져옴
  const opponentMemberId = new URLSearchParams(location).get("user");

  const { id } = useParams();

  // 내 정보 가져오기
  const personalInfo = useSelector((state) => state.personalInfo);
  const token = useSelector(authToken);
  const { personalInfoStatus: myAccountInfo, loading } = personalInfo;

  const messageInfo = useSelector((state) => state.messageInfo);

  const [connected, setConnected] = useState(false);
  const headers = { memberId: myAccountInfo?.memberId };

  const client = new Client({
    brokerURL: "ws://l138.2.127.153:8080//ws/websocket",

    debug: function (str) {
      console.log(str);
    },
    webSocketFactory: function () {
      return new SockJS("http://138.2.127.153:8080/chat");
    },

    onStompError: function (frame) {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    },
  });

  const connect = () => {
    client.onConnect = (frame) => {
      console.log(frame);
      client.subscribe(
        `/topic/${myAccountInfo?.memberId}`,
        function (response) {
          console.log("message");
        }
      );
    };
  };
  const disconnect = () => {
    client.deactivate();
  };
  // 메세지 보내기 위한 form control
  const onSubmit = useCallback(async (data) => {
    console.log(data);
  }, []);

  // JSX를 추상화한 Props Object
  const bottomProps = {
    onSubmit: onSubmit,
  };

  // JSX를 추상화한 Props Object
  const props = {
    name: "장석구",
  };

  // 내 정보 불러오기
  useEffect(() => {
    if (!myAccountInfo) {
      dispatch(getPersonalInfoAction());
    } else {
      client.activate();

      connect();
    }

    return () => disconnect();
  }, [myAccountInfo]);
  return (
    <Conversation>
      <ConversatonHeaderView {...props} />

      <ConversationContent />
      <ConversationBottom {...bottomProps} />
    </Conversation>
  );
};

const Conversation = styled.section`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  background-color: white;
`;

export default ConversationScreen;
