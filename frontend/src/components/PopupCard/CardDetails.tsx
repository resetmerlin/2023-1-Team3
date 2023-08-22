import CardDetailsView from './CardDetailsView';
import './CardDetails.scss';
export default function CardDetails({
  user,
  blockAction,
  likeAction,
  age,
  blockValue,
  saveValue,
  goBackToSlide,
  imageSrc,
  startMessage,
}) {
  const props = {
    goBackToSlide,
    imageSrc,
    name: user?.name,
    age,
    blockValue,
    blockAction,
    memberId: user?.memberId,
    department: user?.department,
    introduction: user?.introduction,
    likeAction,
    saveValue,
    startMessage,
  };
  return <CardDetailsView {...props} />;
}
