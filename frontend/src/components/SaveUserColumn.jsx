import React from "react";
import { useDispatch } from "react-redux";
import { deleteSaveAction } from "../actions/saveAction";

const SaveUserColumn = ({ user }) => {
  const dispatch = useDispatch();
  console.log(user);
  return (
    <div className="save__column">
      <div className="save__profile">
        <img src="./public/images/userImage/user-1.jpg" alt="save-profile" />
      </div>
      <div className="save__desc">
        <span className="save__desc__name">{user?.name}</span>
      </div>
      <div className="save__delete">
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
      </div>
    </div>
  );
};

export default SaveUserColumn;
