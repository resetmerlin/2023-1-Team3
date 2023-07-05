import React, { useCallback, useEffect, useRef, useState } from "react";
import Messages from "../../components/Messages";
import Footer from "../../components/Footer";
import { MessageHeader } from "../../components/Header";
import { styled } from "styled-components";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPersonalInfoAction } from "../../actions/securityEditAction";
import { getMessagesAction } from "../../actions/messageAction";
const MessageScreen = () => {
  const navigate = useNavigate(0);
  const dispatch = useDispatch();
  // 내 정보 가져오기
  const personalInfo = useSelector((state) => state.personalInfo);
  const { personalInfoStatus: myAccountInfo, loading } = personalInfo;

  const { id } = useParams();

  // 웹 소켓 접속 여부의 체크해주는 state
  const [connected, setConnected] = useState(false);

  // 유저가 메세지 queue 주소와 접속했는지 확인하는 state
  const [subscribed, setSubscribed] = useState(false);

  const client = useRef();

  /** 내가 보낸 혹은 받은 메세지를 state로 저장 */
  const getMessageFromServer = useCallback((response) => {
    dispatch(getMessagesAction(response));
  });

  /** 현재 IS0 format 시간대를 보내 줌 */
  const giveCurrentTime = () => {
    const date = new Date();
    const utcTime = date.getTime();
    const kstDate = new Date(utcTime + 9 * 60 * 60 * 1000);

    const year = kstDate.getUTCFullYear();
    const month = ("0" + (kstDate.getUTCMonth() + 1)).slice(-2);
    const day = ("0" + kstDate.getUTCDate()).slice(-2);
    const hours = ("0" + kstDate.getUTCHours()).slice(-2);
    const minutes = ("0" + kstDate.getUTCMinutes()).slice(-2);
    const seconds = ("0" + kstDate.getUTCSeconds()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  };

  /** 메세지를 주고 받았던 사람들을 불러옴  */
  function getPersonMessageRelation() {
    client.current.send(
      "/app/log",
      {},
      JSON.stringify({
        memberId: myAccountInfo?.memberId,
        timeStamp: giveCurrentTime(),
      })
    );
  }

  /** CONNECT: 웹 소켓 열어서 서버와 통신 시작 */
  function connectionInitiate() {
    const socket = new SockJS(`${import.meta.env.VITE_API_URL}/chat`);
    client.current = Stomp.over(socket);
    client.current.connect({}, () => {
      setConnected(true);
      getDirectionOfMessages();
    });
  }

  /** SUBSCRIBE: 내 메세지 direction 접속 */

  function getDirectionOfMessages() {
    const memberId = myAccountInfo?.memberId;
    const headers = { memberId: memberId };

    client.current.subscribe(
      `/topic/${memberId}`,
      function (response) {
        // 메세지 기록 redux에 저장하기 위해 dispatch
        getMessageFromServer(response);

        console.log(response);
      },
      headers
    );
    setSubscribed(true);

    getPersonMessageRelation();
  }

  useEffect(() => {
    if (!myAccountInfo) {
      dispatch(getPersonalInfoAction());
    } else {
      connectionInitiate();
    }
  }, [myAccountInfo]);

  const startMessageHandker = () => {
    if (user) {
      navigate(`/message/id?user=${DemoUser?.memberId}`);
    }
  };
  const startMessageHandler = () => {
    if (user) {
      navigate(`/message/id?user=${DemoUser1?.memberId}`);
    }
  };

  // Demo 상대 유저 정보
  const DemoUser = {
    memberId: 10,
    name: "김서현",
    gender: "FEMALE",
    birth: "2001-06-08",
    image: "DEFAULT",
    department: "응용컴퓨터공학과",
    introduction: "반갑습니다~ 김서현입니다!",
    startMessageHandker: startMessageHandker,
  };

  const DemoUser1 = {
    memberId: 1,
    name: "김민준",
    gender: "MALE",
    birth: "1998-05-26",
    image: "DEFAULT",
    department: "소프트웨어학과",
    introduction: "반갑습니다~ 김서현입니다!",
    startMessageHandker: startMessageHandler,
  };
  return (
    <>
      <section className="message">
        <MessageHeader navigate={navigate}></MessageHeader>

        <Row>
          <NewMessagesCount>9개의 새로운 메세지</NewMessagesCount>
          <Messages {...DemoUser} />
          <Messages {...DemoUser1} />
        </Row>
        <Footer />
      </section>
    </>
  );
};

const NewMessagesCount = styled.span`
  display: inline;
  padding: 3px;
  width: fit-content;
  color: black;
  background-color: #efeefd;
  margin: 0 1rem;
  color: #8071fc;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  height: 76vh;
  width: 100%;

  padding: 2rem 1.3rem 0 1.3rem;
`;

export default MessageScreen;
