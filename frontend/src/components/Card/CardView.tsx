import Button from '../atoms/button/InstanceMaker';
import { IconHeartSolid } from '../atoms/icon/IconHeart';
import IconMessageSolid from '../atoms/icon/IconMessage';
import IconX from '../atoms/icon/IconX';

type Props = {
  memberId: string;
  name: string;
  age: number;
  department: string;
  likeAction: () => void;
  goNextSlideHandler: () => void;
  startMessage: () => void;
  saveValue: boolean;
  imageSrc: string;
  setChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CardView({
  memberId,
  setChecked,
  name,
  age,
  department,
  goNextSlideHandler,
  likeAction,
  saveValue,
  startMessage,
  imageSrc,
}: Props) {
  return (
    <div className="card">
      <div className="card__top">
        <img
          className="card__top__profile"
          decoding="async"
          loading="lazy"
          src={imageSrc}
          key={imageSrc}
          alt="card-profilee"
        />
      </div>
      <div className="card__bottom">
        <div className="card__bottom__wrap">
          <div className="card__bottom__info">
            <div className="card__bottom__info-main">
              <label htmlFor={memberId}>
                <input
                  type="checkbox"
                  onChange={setChecked}
                  id={memberId}
                  style={{ display: 'none' }}
                />
                <span className="card__bottom__info-main__name">
                  {name}
                  <span className="card__bottom__info-main__age"> {age}</span>
                </span>
              </label>
            </div>

            <span className="card__bottom__info__department">{department}</span>
          </div>

          <div className="card__bottom__buttons">
            <Button onClick={goNextSlideHandler} division="icon" size="l">
              <IconX />
            </Button>
            <Button
              onClick={likeAction}
              division="icon"
              size={saveValue ? 'xl' : 'l'}
            >
              <IconHeartSolid />
            </Button>
            <Button onClick={startMessage} division="icon">
              <IconMessageSolid />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
