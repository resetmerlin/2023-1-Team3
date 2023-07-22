import React from "react";
import { styled } from "styled-components";

const SettingScreenSkeleton = () => {
  return (
    <>
      <SettingUserContent>
        <SettingUserImage
          style={{
            backgroundColor: "rgb(236, 234, 247, 1)",
            border: "none",
          }}
        ></SettingUserImage>
        <SettingUserTextWrap></SettingUserTextWrap>
      </SettingUserContent>
      <SettingMiddlContent></SettingMiddlContent>
      <SettingAccountContent></SettingAccountContent>
      <SettingLastContent></SettingLastContent>
    </>
  );
};
const SettingUserName = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 0.5rem;
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
  }
`;
const SettingUserImage = styled.img`
  height: 5.3rem;
  width: 5.3rem;
  border-radius: 8px;
  display: flex;
  align-self: center;
  object-fit: cover;
`;

const SettingMiddlContent = styled.div`
  height: 27.5%;
  width: 88%;
  border-radius: 8px;
  margin: 1rem 0;
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
  height: 16%;
  justify-content: center;
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
  height: 12%;
  width: 88%;
  border-radius: 8px;
  padding: 1rem 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  justify-content: center;
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
export default SettingScreenSkeleton;
