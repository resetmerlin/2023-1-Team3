import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ConversatonHeaderView from "./header/ConversatonHeaderView";
import ConversationContent from "./content/ConversationContent";
import ConversationBottom from "./bottom/ConversationBottom";
import { useParams, useLocation } from "react-router-dom";
import Stomp from "stompjs";
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

  const client = useRef();

  const connectionInitiate = () => {
    const socket = new SockJS(`http://138.2.127.153:8080/chat`);
    client.current = Stomp.over(socket);

    client.current.connect(
      "",
      "",
      function (frame) {
        console.log("Connected: " + frame);
        subscribe();
      },
      function (error) {
        // print the error
        console.log("STOMP: " + error);
      }
    );

    client.current.debug = (frame) => {
      console.log(frame);
    };
  };

  const subscribe = () => {
    client.current.subscribe(
      `/topic/${myAccountInfo?.memberId}`,
      function (response) {
        onMessageReceived(response);
      }
    );
  };
  // 메세지 기록 가져옴
  const getMessageHistory = () => {
    if (connected) {
      // 상대 memberId
      const memberId = opponentMemberId;

      client.current.send(
        "/app/fetch",
        {},
        JSON.stringify({
          memberId: memberId,
          timeStamp: Date.now(),
        })
      );
    }
  };

  // 메세지 보냄
  const sendMsg = (message) => {
    console.log(message);
    if (connected) {
      //your memberId
      const memberId = myAccountInfo?.memberId;
      client.send(
        "/app/send",
        {},
        JSON.stringify({
          sendMemberId: memberId,
          //Other user's memberId
          recvMemberId: opponentMemberId,
          timeStamp: Date.now(),
          // the message that you want to send
          message: message,
        })
      );
    }
  };

  // 메세지 보내기 위한 form control
  const onSubmit = useCallback(async (data) => {
    sendMsg(data);
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
      connectionInitiate();
    }
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
