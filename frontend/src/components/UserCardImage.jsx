import React from "react";
import { styled } from "styled-components";

const UserCardImage = ({ user }) => {
  return (
    <>
      {" "}
      {user?.image == "DEFAULT" && user?.gender == "MALE" ? (
        <UserCardProfile
          
          style={{
            backgroundImage: `
url('./default/default-men.png')`,
            backgroundRepeat: "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></UserCardProfile>
      ) : user?.image == "DEFAULT" && user?.gender == "FEMALE" ? (
        <UserCardProfile
          
          style={{
            backgroundImage: `
url('./default/default-women.png')`,
            backgroundRepeat: "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></UserCardProfile>
      ) : (
        <UserCardProfile
          
          style={{
            backgroundImage: `
url(${user?.image}`,
            backgroundRepeat: "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></UserCardProfile>
      )}
    </>
  );
};

export default UserCardImage;

const UserCardProfile = styled.div`
  height: 77%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.5rem;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  transition: all 0.2s ease;
  border-radius: 12px;
`;
