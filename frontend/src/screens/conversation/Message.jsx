import React, { useEffect, useState } from "react";

const Message = () => {
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {}, [stompClient]);

  const message = () => {
    const socket = new SockJS("/chat");
    const memberId = 1;
    const headers = { memberId: memberId };

    setStompClient(Stomp.over(socket));

    stompClient.connect({}, function (frame) {
      setStompClient(true);
      console.log("Connected: " + frame);
    });
    const setDirectionOfQueue = () => {
      // 내 memberId
      const memberId = 5;
      const headers = { memberId: memberId };

      stompClient.subscribe(
        `/topic/${memberId}`,
        function (messageResponse) {
          // called when the client receives a STOMP message from the server
          if (messageResponse) parseMessageQueue(messageResponse);
        },
        headers
      );
    };
  };

  const parseMessageQueue = (messageResponse) => {
    const chatMessageResponse = JSON.parse(messageResponse.body);

    if (chatMessageResponse.status === "SEND") {
      makeObjAboutMessages(chatMessageResponse);
    } else if (chatMessageResponse.status === "FETCH") {
      if (chatMessageResponse.count !== 0) {
        makeObjAboutMessages(chatMessageResponse);
      }
    } else {
      // "RE-FETCH"
      makeObjAboutMessages(chatMessageResponse);
      fetch();
    }
  };

  const makeObjAboutMessages = (chatMessageResponse) => {
    console.log(chatMessageResponse.chatMessages);
  };

  const fetch = () => {
    // 상대 memberId
    const memberId = 1;

    stompClient.send(
      "/app/fetch",
      {},
      JSON.stringify({
        memberId: memberId,
        timeStamp: Date.now(),
      })
    );
  };

  const sendMsg = () => {
    //your memberId
    const memberId = 5;
    stompClient.send(
      "/app/send",
      {},
      JSON.stringify({
        sendMemberId: memberId,
        //Other user's memberId
        recvMemberId: 1,
        timeStamp: Date.now(),
        // the message that you want to send
        message: "",
      })
    );
  };

  function showGreeting(message) {
    var newMessage = document.createElement("tr");
    newMessage.innerHTML = "<td>" + message + "</td>";
    document.getElementById("greetings").appendChild(newMessage);
  }

  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    setStompClient(false);
    console.log("Disconnected");
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("connect").addEventListener("click", connect);
    document.getElementById("disconnect").addEventListener("click", disconnect);
    document
      .getElementById("fetch")
      .addEventListener("click", setDirectionOfQueue);
    document.getElementById("send").addEventListener("click", sendMsg);
  });
};
