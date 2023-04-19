import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SaveList from "../components/SaveList";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getSaveListAction } from "../actions/saveAction";
const SaveScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Redux에서 가져온 로그인 정보 */
  const loginInfo = useSelector((state) => state.loginInfo);

  /** loginInfo에서의 token값  */
  const { sessfbs_ffa0934 } = loginInfo;

  /** Redux에서 가져온 유저의 save list 정보 */
  const saveListInfo = useSelector((state) => state.saveListInfo);
  const { loading, error, saveListStatus } = saveListInfo;

  const [page, setPage] = useState(0);

  const nextPageHandler = (e) => {
    setPage(e);
  };

  useEffect(() => {
    if (!sessfbs_ffa0934) {
      navigate("/login");
    } else if (!saveListStatus) {
      dispatch(getSaveListAction(page));
    }
  }, [sessfbs_ffa0934, dispatch, saveListStatus, page]);

  return (
    <section className="save">
      <span className="save__title">Your save list</span>

      <SaveList
        saveListStatus={saveListStatus}
        pageState={page}
        pageFunc={nextPageHandler}
      />
      <Footer />
    </section>
  );
};

export default SaveScreen;
