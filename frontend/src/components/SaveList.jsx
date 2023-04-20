import React, { useState } from "react";
import { Link } from "react-router-dom";
import SaveUserColumn from "./SaveUserColumn";
import { useDispatch, useSelector } from "react-redux";
import { getSaveListAction } from "../actions/saveAction";

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
      <div className="save__row">
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
      </div>
    </>
  );
};

export default SaveList;
