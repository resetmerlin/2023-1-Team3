import { styled } from 'styled-components';
import CardView from './CardView';
import Button from '../atoms/button/InstanceMaker';
import IconX from '../atoms/icon/IconX';

const MyCard = ({
  user,
  age,
  imageSrc,
  popupCheckedHandler,
  goBackToScreen,
}) => {
  const props = {
    imageSrc,
    setChecked: popupCheckedHandler,
    memberId: user?.memberId,
    department: user?.department,
    age,
    name: user?.name,
    goBackToScreen,
  };
  return <MyCardView {...props} />;
};
const MyCardView = (props) => {
  return (
    <MyCardWrap>
      <Button
        onClick={props?.goBackToScreen}
        division="icon"
        type="tertiary"
        size="xl"
        className="my-card__quit-button"
      >
        <IconX />
      </Button>
      <CardView {...props} />
    </MyCardWrap>
  );
};

const MyCardWrap = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  height: 100%;
  flex-direction: column;
  width: 21.887rem;
  height: 41.392rem;

  display: flex;
  justify-content: center;
  align-items: center;
  .my-card__quit-button {
    position: absolute;
    background: transparent;
    top: 1%;
    right: 4%;
    z-index: 1000;
  }
`;

export default MyCard;
