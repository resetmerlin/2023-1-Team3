import './Card.scss';
import CardView from './CardView';

type Props = {
  user: { memberId: string; department: string; name: string };
  savAction: () => void;
  goNextSlideHandler: () => void;
  startMessage: (memberId: string) => void;
  saveValue: boolean;
  popupStyle: { display: string };
  age: number;
  imageSrc: string;
  popupCheckedHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Card({
  goNextSlideHandler,
  user,
  saveValue,
  startMessage,
  savAction,
  age,
  imageSrc,
  popupCheckedHandler,
}: Props) {
  const props = {
    imageSrc,
    setChecked: popupCheckedHandler,
    department: user?.department,
    age,
    name: user?.name,
    goNextSlideHandler: () => {
      goNextSlideHandler();
    },
    likeAction: () => {
      savAction();
    },
    saveValue,
    memberId: user?.memberId,
    startMessage,
  };

  return <CardView {...props} />;
}
