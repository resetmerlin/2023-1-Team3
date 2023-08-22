import { memo } from 'react';
import { styled } from 'styled-components';
import Button from './atoms/button/InstanceMaker';
import { IconChevronRight } from './atoms/icon/IconChevron';

const NoValueUser = memo(function NoValueUser({ getPeopleList }) {
  return (
    <HomeWrap>
      <NoValueWrap>
        <NoValueImageWrap>
          <NoValueImage src="/no-value.png" alt="no-value-image" />
        </NoValueImageWrap>

        <NoValueTextWrap>
          <NoValueTextBig>더 볼 유저가 없습니다.. </NoValueTextBig>
          <NoValueTextSmall>처음부터 유저를 다시 볼까요?</NoValueTextSmall>
        </NoValueTextWrap>
        <NoValueTextWrap style={{ height: '27%' }}>
          <Button size="xl" onClick={getPeopleList} className="center">
            유저 다시보기
            <IconChevronRight size="2rem" color="white" />
          </Button>
        </NoValueTextWrap>
      </NoValueWrap>
    </HomeWrap>
  );
});
const HomeWrap = styled.div`
  position: absolute;
  height: 94%;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoValueTextBig = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  padding: 0.7rem 0;
`;

const NoValueTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 23%;

  button {
    width: 47%;
    font-size: 1rem;
  }
`;
const NoValueTextSmall = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

const NoValueImage = styled.img`
  width: 11rem;
  height: 14rem;
`;
const NoValueImageWrap = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0.4rem 0;
`;

const NoValueWrap = styled.div`
  height: 99%;
  width: 85%;
  border-radius: 12px;

  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 0.7rem 0;
  align-items: center;
  // box-shadow: 0px 0px 17px 6px rgb(236, 234, 247, 1);
  // -webkit-box-shadow: 0px 0px 17px 6px rgb(236, 234, 247, 1);
  // -moz-box-shadow: 0px 0px 17px 6px rgb(236, 234, 247, 1);
`;
export default NoValueUser;
