import React, { useState } from "react";
import { Link } from "react-router-dom";
import SaveUserColumn from "./SaveUserColumn";
import { useDispatch, useSelector } from "react-redux";
import { getSaveListAction } from "../actions/saveAction";
import { styled } from "styled-components";
const SaveList = ({ saveListStatus }) => {
  const [popupChecked, setPopupChecked] = useState(false);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  const handlePopupChechekd = (e) => {
    setPopupChecked(e.target.checked);
  };

  const getNewPageList = () => {
    dispatch(getSaveListAction(page + 1));
    setPage(page + 1);
  };

  const getLastestPageList = () => {
    dispatch(getSaveListAction(page - 1));
    setPage(page - 1);
  };
  return (
    <>
      {popupChecked ? (
        <section className="popup">
          <button
            className="popup__back"
            onClick={() => setPopupChecked(false)}
          >
            <box-icon name="arrow-back" color="white"></box-icon>
          </button>
          <div className="popup__main">
            <div className="popup__main__information">
              <span className="popup__main__information__name">Chloe, 24</span>
              <div className="popup__main__information__desc">
                <div className="popup__main__information__desc__wrap">
                  <box-icon
                    type="solid"
                    name="graduation"
                    color="white"
                    style={{ marginRight: ".4rem" }}
                  ></box-icon>
                  DKU Computer-Science
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      <SaveRow>
        {saveListStatus?.memberResponses.map((user) => {
          return <SaveUserColumn key={user.memberId} user={user} />;
        })}

        {saveListStatus?.endPageSignal == false && (
          <button className="save__load" type="button" onClick={getNewPageList}>
            <box-icon type="solid" name="chevron-down"></box-icon>
          </button>
        )}

        {page > 0 && (
          <button
            className="save__load"
            type="button"
            value={page}
            onClick={getLastestPageList}
          >
            <box-icon name="chevron-up"></box-icon>{" "}
          </button>
        )}
      </SaveRow>
    </>
  );
};

const SaveRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0 0.8rem;
  height: 82vh;
  position: absolute;
  align-items: start;
  overflow: scroll;
  justify-content: start;
  flex: 1;
  top: 9%;

  // .save-column:nth-child(2n) {
  //   height: 40%;
  // }
  .save-column:nth-child(2) {
  }
  // .flex-item:nth-child(1) {
  //   order: 2; /* Change the order of the first flex item */
  // }

  // .flex-item:nth-child(2) {
  //   order: 3; /* Change the order of the second flex item */
  // }
`;
export default SaveList;
