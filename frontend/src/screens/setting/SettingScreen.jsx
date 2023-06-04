import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { styled } from "styled-components";
import { SettingHeader } from "../../components/Header";
import { LogoutButton } from "../../components/Button";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../actions/userAction";
const SettingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
  };
  return (
    <Setting>
      <SettingHeader navigate={navigate} name={"마이페이지"} />
      <SettingUserContent>
        <SettingUserImage></SettingUserImage>
        <SettingUserTextWrap>
          <span style={{ fontSize: "1.4rem" }}>
            <span
              style={{
                fontSize: "1.4rem",
                fontWeight: "600",
                marginRight: ".5rem",
              }}
            >
              김주영
            </span>
            26
          </span>

          <span>커뮤니케이션 디자인학과</span>
        </SettingUserTextWrap>
      </SettingUserContent>
      <SettingMiddlContent>
        <span>자기소개</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla at eum
          in aspernatur qui voluptates ipsa vero esse hic optio, ratione dolorem
          perferendis itaque iste vel! Ratione sint eius delectus.
        </p>
      </SettingMiddlContent>
      <SettingAccountContent>
        <Link>프로필 설정</Link>

        <Link to="/setting/account-security">계정보안 설정</Link>
        <Link>개인정보 보호</Link>
        <Link>문의</Link>
      </SettingAccountContent>
      <SettingLastContent>
        <LogoutButton logout={logoutHandler} />
        <button style={{ color: "red" }}>계정에서 탈퇴</button>
      </SettingLastContent>
      <Footer />
    </Setting>
  );
};

const Setting = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;

  align-self: start;
`;

const SettingUserContent = styled.div`
  height: 12.5%;
  width: 88%;
  border-radius: 8px;
  display: flex;
  box-shadow: 0px 8px 15px 5px rgb(236, 234, 247, 1);
  align-self: center;
  padding: 1rem;
`;

const SettingUserTextWrap = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  padding: 0.3rem 1rem;

  span {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
`;
const SettingUserImage = styled.div`
  height: 5.3rem;
  width: 5.3rem;
  border-radius: 8px;
  display: flex;
  border: 1px solid black;
  align-self: center;
`;

const SettingMiddlContent = styled.div`
  height: 27.5%;
  width: 88%;
  border-radius: 8px;
  margin: 1.5rem 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  -webkit-box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  align-self: center;
  span {
    font-size: 1rem;
    font-weight: 800;
    color: #8071fc;
    margin-bottom: 0.8rem;
  }
  p {
    color: black;
  }
`;

const SettingAccountContent = styled.div`
  height: 18%;
  width: 88%;
  border-radius: 8px;
  margin: 0 0 1rem 0;
  display: flex;
  flex-direction: column;
  box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  -webkit-box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  -moz-box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  align-self: center;

  a {
    height: 25%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 1.4rem;
    color: black;

    text-decoration: none;
    font-size: 1.1rem;
    background-color: white;
    border: none;
    border-radius: 8px;
    align-self: center;
  }
`;

const SettingLastContent = styled.div`
  height: 9%;
  width: 88%;
  border-radius: 8px;
  margin: 0;
  display: flex;
  flex-direction: column;

  box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  -webkit-box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  -moz-box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  align-self: center;
  button {
    height: 50%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 1.4rem;
    font-size: 0.95rem;
    background-color: white;
    border: none;
    border-radius: 8px;
    align-self: center;
    color: black;
  }
`;

export default SettingScreen;
