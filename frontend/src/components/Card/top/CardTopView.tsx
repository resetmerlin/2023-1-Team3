import './CardTop.scss';

export default function CardTopView({ imageSrc }) {
  return (
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
  );
}
