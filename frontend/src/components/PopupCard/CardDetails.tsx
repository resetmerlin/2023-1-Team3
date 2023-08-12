export default function CardDetails({
  user,
  blockAction,
  likeAction,
  age,
  blockValue,
  saveValue,
  goBackToSlide,
  imageSrc,
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
  };
  return <CardDetailsView {...props} />;
}
