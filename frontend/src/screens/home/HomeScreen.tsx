import React, {
  useEffect,
  useRef,
  Suspense,
  useCallback,
  useState,
} from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useDispatch, useSelector } from 'react-redux';
import { peopleListAction } from '../../actions/peopleAction';
import Loading from '../../components/Loading';
import { saveUserAction } from '../../actions/buttonAction';
import { HomeHeader } from '../../components/Header';
import NoValueUser from '../../components/NoValueUser';
import { useNavigate, useParams } from 'react-router-dom';
import { blockUserAction } from '../../actions/buttonAction';
import { PEOPLE_LIST_RESET } from '../../constants/peopleConstants';
import { messageInitiateAction } from '../../actions/messageAction';
import { getSaveListAction } from '../../actions/saveAction';
import Footer from '../../components/Footer';
import HomeContent from './content/HomeContent';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Popup 여부에 따라 동적으로 다른 html element에 스타일 적용하기 */
  const [userCardPopup, setUserCardPopup] = useState(false);

  const splideRef = useRef(null);
  const previousSplideRef = useRef(-1);

  /** Redux에서 가져온 유저 리스트 */
  const peopleListInfo = useSelector((state) => state.peopleListInfo);
  const { peopleListStatus, loading: peopleListLoading } = peopleListInfo;

  /** splide option */
  const options = {
    rewind: false,
    type: 'slide',
    perPage: 1,
    perMove: 1,
    pagination: false,
    drag: !userCardPopup,
  };

  /** 유저 리스트 불러오기 */
  const getPeopleList = useCallback(
    () => dispatch(peopleListAction()),
    [dispatch]
  );

  /** 유저 좋아요 혹은 저장하기 */
  const sendLikeUser = useCallback(
    (memberId: string, saveBoolean: boolean) =>
      dispatch(saveUserAction(memberId, saveBoolean)),
    [dispatch]
  );

  /** 유저 차단 혹은 삭제하기  */
  const sendBlockUser = useCallback(
    (memberId: string, blockBoolean: boolean) =>
      dispatch(blockUserAction(memberId, blockBoolean)),
    [dispatch]
  );

  /** checked state(true or false)를 parameter로 받아 state로 저장 */
  const getUserFromChild = useCallback(
    (popupBoolean: boolean) => {
      setUserCardPopup(popupBoolean);
    },
    [setUserCardPopup]
  );

  /** 새로 유저 리스트 가져오기 */
  const nextPeopleListsHandler = useCallback(() => {
    getPeopleList();
    previousSplideRef.current = -1;
    splideRef?.current?.splide.Components.Controller.go(0);
  }, [getPeopleList]);

  /** 슬라이드시 페이지 값 갱신 */
  const slidePageHandler = useCallback(
    (splide) => {
      const currentPage = splide?.Components?.Controller.getIndex();
      const lastPage = splide?.Components?.Controller.getEnd();

      if (currentPage !== previousSplideRef?.current) {
        previousSplideRef.current = currentPage;
      } else if (
        /** 마지막 페이지에 있는데 슬라이드를 할 경우 */
        previousSplideRef?.current === lastPage
      ) {
        nextPeopleListsHandler();
      }
    },
    [previousSplideRef, nextPeopleListsHandler]
  );

  /** 다음 슬라이드로 이동 */
  const goNextSlideHandler = useCallback(() => {
    const getNextPage =
      splideRef?.current?.splide.Components.Controller.getNext();
    const lastPage = splideRef?.current?.splide.Components.Controller.getEnd();

    if (previousSplideRef?.current === lastPage) {
      nextPeopleListsHandler();
    } else {
      splideRef?.current?.splide.Components.Controller.go(getNextPage);
    }
  }, [previousSplideRef, nextPeopleListsHandler]);

  const startMessage = async (memberId: string) => {
    const userInfo = peopleListStatus?.memberResponses
      .filter((users: { memberId: string }) => users.memberId === memberId)
      .map((user) => user);

    if (userInfo) {
      await dispatch(
        messageInitiateAction({
          birth: userInfo[0].birth,
          department: userInfo[0].department,
          gender: userInfo[0].gender,
          image: userInfo[0].image,
          introduction: userInfo[0].introduction,
          memberId: userInfo[0].memberId,
          name: userInfo[0].name,
        })
      );
      navigate(`/message/id?user=${memberId}`);
    }
  };

  /** 해당 route에 이동할때마다 유저 리스트 초기화 */
  useEffect(() => {
    dispatch({ type: PEOPLE_LIST_RESET });
    dispatch(getSaveListAction(0));
  }, [dispatch]);

  /** 유저리스트 response 서버로부터 사람 리스트 불러옴 */
  useEffect(() => {
    if (!peopleListStatus?.memberResponses) getPeopleList();
  }, [peopleListStatus, getPeopleList]);

  return (
    <section className="home">
      <HomeHeader
        navigate={navigate}
        style={{ display: userCardPopup ? 'none' : 'flex' }}
      />
      {peopleListLoading ? (
        <Loading />
      ) : (
        <Splide
          ref={splideRef}
          hasTrack={false}
          options={options}
          id="Splide"
          onMoved={slidePageHandler}
          style={{ height: userCardPopup ? '100vh' : '77vh' }}
        >
          <SplideTrack>
            {peopleListStatus &&
              peopleListStatus?.memberResponses.map(
                (user: { memberId: string }) => {
                  return (
                    <Suspense fallback={<Loading />} key={user.memberId}>
                      <SplideSlide key={user.memberId} id="SplideSlide">
                        <HomeContent
                          user={user}
                          key={user.memberId}
                          peopleListLoading={peopleListLoading}
                          sendLikeUser={sendLikeUser}
                          startMessage={startMessage}
                          goNextSlideHandler={goNextSlideHandler}
                          userCardPopup={userCardPopup}
                          sendBlockUser={sendBlockUser}
                          getUserFromChild={getUserFromChild}
                        />
                      </SplideSlide>
                    </Suspense>
                  );
                }
              )}

            {peopleListStatus?.endPageSignal && (
              <SplideSlide>
                <NoValueUser getPeopleList={getPeopleList} />
              </SplideSlide>
            )}
          </SplideTrack>
        </Splide>
      )}

      <Footer style={{ display: userCardPopup ? 'none' : 'flex' }} />
    </section>
  );
}
