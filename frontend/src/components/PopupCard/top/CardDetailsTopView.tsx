import './CardDetailsTop.scss';

interface Props {
  imageSrc: string;
}

export default function CardDetailsTopView({ imageSrc }: Props) {
  return (
    <div className="card-details__top">
      <img
        className="card-details__profile"
        loading="lazy"
        src={imageSrc}
        key={imageSrc}
        alt="card-details-profile"
      />
    </div>
  );
}
