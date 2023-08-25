import { styled } from 'styled-components';
import UserMessage from '../../components/UserMessage/UserMessage';
import Header from '../../components/atoms/header/InstanceMaker';
import Button from '../../components/atoms/button/InstanceMaker';
import { IconChevronLeft } from '../../components/atoms/icon/IconChevron';
import Footer from '../../components/atoms/footer/InstanceMaker';

const MessageScreenView = ({ navigate, n, messageUserList, startMessage }) => {
  return (
    <Message>
      <Header page="message" size="xl">
        <Button
          size="xl"
          division="icon"
          type="tertiary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IconChevronLeft />
        </Button>
        <span className="header__title">Message</span>
      </Header>

      <Row>
        <NewMessagesCount>{n}개의 새로운 메세지</NewMessagesCount>

        {messageUserList &&
          messageUserList.map((user) => {
            return (
              <UserMessage
                user={user}
                startMessage={startMessage}
                key={user?.memberId}
              />
            );
          })}
      </Row>
      <Footer page="message" />
    </Message>
  );
};
const NewMessagesCount = styled.span`
  display: inline;
  padding: 3px;
  width: fit-content;
  color: black;
  background-color: #efeefd;
  color: #8071fc;
  font-weight: 600;
  margin-bottom: 1.4rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  height: 76vh;
  width: 100%;

  padding: 2rem 1.3rem 0 1.3rem;
`;

const Message = styled.section`
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  align-self: start;
`;
export default MessageScreenView;
