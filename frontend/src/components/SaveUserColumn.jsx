import React from "react";
import { useDispatch } from "react-redux";
import { deleteSaveAction } from "../actions/saveAction";
import { styled } from "styled-components";

const SaveUserColumn = ({ user }) => {
  return (
    <SaveColumnBig className="save-column">
      {user?.image == "DEFAULT" && user?.gender == "MALE" ? (
        <SaveUserProfile
          style={{
            backgroundImage: `
    url('./default/default-men.png')`,
            backgroundRepeat: "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          alt="save-profile"
        ></SaveUserProfile>
      ) : user?.image == "DEFAULT" && user?.gender == "FEMALE" ? (
        <SaveUserProfile
          style={{
            backgroundImage: `
    url('./default/default-women.png')`,
            backgroundRepeat: "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          alt="save-profile"
        ></SaveUserProfile>
      ) : (
        <SaveUserProfile
          style={{
            backgroundImage: `
  url(${user?.image}`,
          }}
          alt="save-profile"
        ></SaveUserProfile>
      )}

      <SaveUserDescWrap>
        <SaveUserName>{user?.name}</SaveUserName>
        <SaveUserMajor>커뮤니케이션학과</SaveUserMajor>
      </SaveUserDescWrap>
      {/* <SaveDeleteWrap>
        <button
          type="button"
          onClick={() => {
            dispatch(deleteSaveAction(user?.memberId));
          }}
        >
          <box-icon
            type="solid"
            name="trash-alt"
            color=" rgb(141, 145, 157)"
            size="1.5rem"
          ></box-icon>
        </button>
      </SaveDeleteWrap> */}
    </SaveColumnBig>
  );
};
const SaveColumnBig = styled.div`
  display: flex;
  width: 47%;
  height: 45%;
  flex-direction: column;
  margin: 0.7rem 0.3rem;
  align-items: center;
  transition: all 0.1s ease-in;
  cursor: pointer;
  background-color: white;
  border-radius: 8px;
`;

const SaveUserProfile = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  align-items: center;
  border-radius: 8px;

  label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
const SaveUserDescWrap = styled.div`
  box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -webkit-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -moz-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  font-size: 1rem;
  width: 100%;
  height: 25%;
  border-bottom-left-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.7rem;
  border-bottom-right-radius: 8px;
`;
const SaveUserName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2px;
`;
const SaveUserMajor = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: #b3aeae;
`;

const SaveDeleteWrap = styled.div`
  font-size: 0.9rem;

  width: 100%;
  height: 12.5%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  button {
    background-color: transparent;
    border: none;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;
export default SaveUserColumn;
