import Button from '../atoms/button/InstanceMaker';
import IconDotHorizontal from '../atoms/icon/IconDot';
import { IconHeartSolid } from '../atoms/icon/IconHeart';
import IconMessageSolid from '../atoms/icon/IconMessage';
import IconX from '../atoms/icon/IconX';

interface Props {
  name: string;
  age: string;
  department: string;
  imageSrc: string;
}

export default function CardDetailsView({
  name,
  age,
  blockAction,
  introduction,
  likeAction,
  saveValue,
  department,
  goBackToSlide,
  imageSrc,
  startMessage,
}: Props) {
  return (
    <div className="card-details">
      <div className="card-details__top">
        <div className="button__wrap">
          <Button
            onClick={goBackToSlide}
            division="icon"
            type="tertiary"
            size="xl"
          >
            <IconX />
          </Button>
        </div>
        <img
          className="card-details__profile"
          loading="lazy"
          src={imageSrc}
          key={imageSrc}
          alt="card-details-profile"
        />
      </div>
      <div className="card-details__bottom">
        <div className="card-details__bottom__info">
          <div className="card-details__bottom__info-main__name">
            {name}
            <div className="card-details__bottom__info-main__age ">{age}</div>
          </div>

          <label htmlFor="popup-dot" className="card-details__dot">
            <IconDotHorizontal />
          </label>
          <input type="checkbox" id="popup-dot" name="popup-dot" />

          <div className="card-details__popup-box">
            <Button size="s" type="secondary">
              신고하기
            </Button>
            <Button onClick={blockAction} size="s" type="secondary">
              삭제하기
            </Button>
          </div>
        </div>
        <div className="card-details__bottom__info-sub__major">
          {department}
        </div>

        <div className="card-details__bottom__info-sub">
          <span className="card-details__bottom__info-sub__introduction">
            {introduction}
          </span>
        </div>
        <div className="card-details__bottom__buttons">
          <Button
            type={saveValue ? 'primary' : 'secondary'}
            className="center"
            size="l"
            onClick={likeAction}
          >
            <IconHeartSolid
              size="1.6rem"
              color={saveValue ? 'white' : 'rgb(128, 113, 252)'}
            />
            <span>{saveValue ? 'Like에서 삭제' : 'Like에 저장'}</span>
          </Button>

          <Button
            type="tertiary"
            className="center"
            size="l"
            onClick={startMessage}
          >
            <IconMessageSolid size="1.6rem" />
            <span>메세지 보내기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
